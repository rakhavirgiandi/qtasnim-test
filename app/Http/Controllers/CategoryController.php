<?php

namespace App\Http\Controllers;

use App\Http\Resources\CategoryCollection;
use App\Http\Resources\CategoryResource;
use App\Models\Category;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Illuminate\Support\Facades\Redirect;
use Illuminate\Validation\Rule;

class CategoryController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        //
        $category = Category::paginate(10);
        $data = new CategoryCollection($category); 
        return Inertia::render('Categories/Index', ['categories' => $data]);
    }
    
    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        //
        return Inertia::render('Categories/Create');
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        //
        $validated = $request->validate([
            'key' => 'required|string|max:255|unique:categories,key|regex:/^[a-z0-9,_-]+$/',
            'title' => 'required|string|max:255',
        ]);

        $category = new Category;
        $category->key = $request->key;
        $category->title = $request->title;

        $category->save();
        
        $request->session()->flash('success', 'Create Product was successful!');

        return Redirect::route('categories.index');
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
        $category = Category::findOrFail($id);
        $data = new CategoryResource($category);

        return Inertia::render('Categories/Edit', ['category' => $data]);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, int $id)
    {
        //
        $validated = $request->validate([
            'key' => ['required','string','max:255','regex:/^[a-z0-9,_-]+$/',Rule::unique('categories', 'key')->ignore($request->key, 'key')],
            'title' => 'required|string|max:255',
        ]);

        $category = Category::find($id);

        if (!$category) {
            $request->session()->flash('error', 'Category not found');
            return Redirect::route('categories.index');
        }

        $category->key = $request->key;
        $category->title = $request->title;

        $category->save();

        $request->session()->flash('success', 'Update Category was successful!');
        return Redirect::route('categories.index');
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Request $request, int $id)
    {
        //
        $category = Category::find($id);

        if ($category) {
            $category->delete();
            $request->session()->flash('success', 'Delete Category was successful!');
        } else {
            $request->session()->flash('error', 'Category Not Found');
        }

        return Redirect::route('categories.index');
    }
}
