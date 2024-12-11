<?php

namespace App\Http\Controllers;

use App\Http\Resources\ProductCollection;
use App\Http\Resources\ProductResource;
use App\Models\Category;
use App\Models\Product;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Illuminate\Support\Facades\Redirect;

class ProductController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index(Request $request)
    {
        //
        $limit_of_row = $request->query('limit') ? $request->query('limit') : "";

        $products = Product::select(
            'products.id as id',
            'products.name',
            'products.*',
            'categories.id as category_id',
            'categories.key as category_key',
            'categories.title as category_title',

        )->leftJoin('categories', 'products.category_id', '=', 'categories.id')->paginate($limit_of_row);
        $data =  new ProductCollection($products);
        // return response()->json($data);

        return Inertia::render('Products/Index', [
            'products' => json_decode(json_encode($data), true)
        ]);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        //
        $categories = Category::orderByDesc('id')->get();

        return Inertia::render('Products/Create', ['categories' => $categories]);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        //
        $validated = $request->validate([
            'name' => 'required|string|max:255',
            'price' => 'required|numeric|max_digits:10',
            'price_currency' => 'required|in:idr',
            'stock' => 'required|numeric|max_digits:10',
            'category_id' => 'required|exists:categories,id',
            'description' => 'nullable|string|max:1000'
        ]);

        $product = new Product;
        $product->name = $request->name;
        $product->price = $request->price;
        $product->price_currency = $request->price_currency;
        $product->stock = $request->stock;
        $product->description = $request->description;

        $category = Category::find($request->category_id);

        if ($category) {
            $product->category()->associate($category);
            $product->save();

            $request->session()->flash('success', 'Create Product was successful!');
        } else {
            $request->session()->flash('error', 'Category not found');
        }

        return Redirect::route(route: 'products.index');
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
        $product = Product::where('products.id', '=', $id)->select(
            'products.id as id',
            'products.name',
            'products.*',
            'categories.id as category_id',
            'categories.key as category_key',
            'categories.title as category_title',
        )->leftJoin('categories', 'products.category_id', '=', 'categories.id')->first();
        
        $categories = Category::orderByDesc('id')->get();

        $data = new ProductResource($product);

        // return response()->json($data);
        return Inertia::render('Products/Edit', ['product' => json_decode(json_encode($data), true), 'categories' => $categories]);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, int $id)
    {
        //
        $validated = $request->validate([
            'name' => 'required|string|max:255',
            'price' => 'required|numeric|max_digits:10',
            'price_currency' => 'required|in:idr',
            'stock' => 'required|numeric|max_digits:10',
            'category_id' => 'required|exists:categories,id',
            'description' => 'nullable|string|max:1000'
        ]);

        $product = Product::find($id);

        $product->name = $request->name;
        $product->price = $request->price;
        $product->price_currency = $request->price_currency;
        $product->stock = $request->stock;
        $product->description = $request->description;

        $category = Category::find($request->category_id);

        if ($category) {
            $product->category()->associate($category);
            $product->save();

            $request->session()->flash('success', 'Update Product was successful!');
        } else {
            $request->session()->flash('error', 'Category not found');
        }

        return Redirect::route(route: 'products.index');
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        //
    }
}
