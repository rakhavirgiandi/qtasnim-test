<?php

namespace App\Http\Controllers;

use App\Http\Resources\OrderCollection;
use App\Models\Category;
use App\Models\Order;
use App\Models\Product;
use Carbon\Carbon;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Inertia\Inertia;
use Illuminate\Support\Facades\Redirect;

class OrderController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index(Request $request)
    {
        //
        $limit_of_row = $request->query('limit') ? $request->query('limit') : 10;
        $search = $request->query('search');
        $sort_column = $request->query('sort-column');
        $sort_type = $request->query('sort-type');
        $start = $request->query('start');
        $end = $request->query('end');

        $order_group_by_category = Order::query();

        if ($start && $end && strtotime($start) && strtotime($end)) {
            $start_date = Carbon::parse($start);
            $end_date = Carbon::parse($end);
            $order_group_by_category->whereDate('order_date', '>=', $start_date);
            $order_group_by_category->whereDate('order_date', '<=', $end_date);
        }

        $order_group_by_category->select(
            'categories.id as category_id',
            'categories.key as category_key',
            'categories.title as category_title',
            DB::raw('COUNT(orders.id) as total_orders')
        )
        ->leftJoin('products', 'orders.product_id', '=', 'products.id')
        ->leftJoin('categories', 'products.category_id', '=', 'categories.id')
        ->groupBy('categories.id', 'categories.title');

        $order_query = Order::query();
        $orders = $order_query->select(
            'orders.*',
            'orders.id as id',
            'orders.created_at as created_at',
            'products.name as product_name',
            'products.price as product_price',
            'products.price_currency as product_price_currency',
            'products.stock as product_stock',
            'categories.id as product_category_id',
            'categories.key as product_category_key',
            'categories.title as product_category_title',
        )
        ->leftJoin('products', 'orders.product_id', '=', 'products.id')
        ->leftJoin('categories', 'products.category_id', '=', 'categories.id');

        if ($search) {
            $orders->where('products.name', 'LIKE', '%'.$search.'%')
            ->orWhere('order_amount', 'LIKE', '%'.$search.'%')
            ->orWhere('previous_stock', 'LIKE', '%'.$search.'%')
            ->orWhere('order_date', 'LIKE', '%'.$search.'%');
        }

        if ($sort_column && $sort_type === 'asc' || $sort_type === 'desc') {
            if ($sort_column === 'name') {
                $orders->orderBy('products.name', $sort_type);
            }
            if ($sort_column === 'order_date') {
                $orders->orderBy('order_date', $sort_type);
            }
        }

        $get_orders = $orders->paginate($limit_of_row);
        $data = new OrderCollection($get_orders);
        $min = $order_group_by_category->clone()->orderBy('total_orders', 'asc')->first();
        $max = $order_group_by_category->clone()->orderBy('total_orders', 'desc')->first();
        
        $min_and_max_order_by_category = [
            "min" => $min,
            "max" => $max
        ];

        return Inertia::render('Order/Index', [
            'orders' => $data,
            'min_and_max_order_by_category' => $min_and_max_order_by_category
        ]);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        //
        $products = Product::where('stock', '>', 0)->get();
        return Inertia::render('Order/Create', ['products' => $products]);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        //
        $validated = $request->validate([
            'product_id' => 'required|exists:categories,id',
            'order_date' => 'required|date',
            'order_amount' => 'required|numeric|max_digits:10',
        ]);

        $product = Product::find($request->product_id);

        if (!$product) {
            return Redirect::route('orders.create')->withErrors(["product_id" => "The selected product does not exist."]);
        }
        
        if ($product->stock <= 0) {
            return Redirect::route('orders.create')->withErrors(["product_id" => "Product out of stock"]);
        }

        $order = new Order;
        $order->order_date = $request->order_date;
        $order->order_amount = $request->order_amount;
        $order->previous_stock = $product->stock;

        $remaining_stock = $product->stock - $request->order_amount;
        $product->stock = $remaining_stock;

        $order->product()->associate($product);

        $product->save();
        $order->save();

        $request->session()->flash('success', 'Create order was successful!');

        return Redirect::route('orders.index');
    }

    /**
     * Display the specified resource.
     */
    public function show(string $id)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(string $id)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, string $id)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Request $request, $id)
    {
        //
        $product = Order::find($id);

        if ($product) {
            $product->delete();
            $request->session()->flash('success', 'Delete Order was successful!');
        } else {
            $request->session()->flash('error', 'Order Not Found');
        }

        return Redirect::route('orders.index');
    }
}
