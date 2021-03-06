<?php

namespace App\Http\Controllers;

use App\Models\Product;
use App\Models\User;
use App\Enums\Roles;
use App\Filters\ProductSearch;
use Illuminate\Http\Request;
use Illuminate\Validation\Rule;


class ProductsController extends Controller
{
    public function index(Request $request)
    {

        $products = Product::where('active', true)->get()->map(function ($product) {
            return $product->map();
        });

        return response()->json($products);
    }

    public function filter(Request $request)
    {
        $paginator = ProductSearch::apply($request)->paginate(12);
        $paginator->getCollection()->transform(function ($product){
            return $product->map();
        });

        return response()->json($paginator);
    }

    public function show(Product $product)
    {
        return response()->json($product->map());
    }

    public function showcase(Request $request)
    {

        $products = Product::where('active', true)->take(3)->get()->map(function ($product) {
            return $product->map();
        });

        return response()->json($products);
    }

    public function store(Request $request)
    {
        $attributes = $this->validateProduct($request);

        $product = Product::create([
            'name' => $attributes['name'],
            'brand_id' => $attributes['brand_id'],
            'productCode' => $attributes['productCode'],
            'description' => $attributes['description'],
            'price' => $attributes['price'],
            'stock' => $attributes['stock']
        ]);

        $product->attatchImages($attributes['images']);

        return response()->json($product, 201);
    }

    public function update(Request $request, Product $product)
    {
        $attributes = $this->validateProductUpdate($request, $product);
        $product->name = $attributes['name'];
        $product->brand_id = $attributes['brand_id'];
        $product->productCode = $attributes['productCode'];
        $product->description = $attributes['description'];
        $product->price = $attributes['price'];
        $product->stock = $attributes['stock'];
        $product->update($attributes);
        $product->attatchImages($attributes['images']);
        $product = $product->fresh();
        return response()->json($product);
    }

    public function deactivate(Product $product)
    {
        $product->deactivate();
        return response()->noContent();
    }


    protected function validateProduct(Request $request)
    {
        return $request->validate([
            'name' => 'required|max:50',
            'brand_id' => 'required|exists:brands,id',
            'productCode' => 'required||max:20|unique:products',
            'description' => 'required|max:2000',
            'price' => 'required',
            'stock' => 'required|min:0',
            'images' => 'required'
        ]);
    }

    protected function validateProductUpdate(Request $request, Product $product)
    {
        return $request->validate([
            'name' => 'required|max:50',
            'brand_id' => 'required|exists:brands,id',
            'productCode' => ['required', 'max:20', Rule::unique('products')->ignore($product)],
            'description' => 'required|max:2000',
            'price' => 'required',
            'stock' => 'required|min:0',
            'images' => 'required'
        ]);
    }
}
