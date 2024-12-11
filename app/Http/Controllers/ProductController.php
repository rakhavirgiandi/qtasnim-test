<?php

namespace App\Http\Controllers;

use App\Http\Resources\ProductCollection;
use App\Http\Resources\ProductResource;
use App\Models\Product;
use Illuminate\Http\Request;
use Inertia\Inertia;

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
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        //
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
    public function destroy(string $id)
    {
        //
    }
}
