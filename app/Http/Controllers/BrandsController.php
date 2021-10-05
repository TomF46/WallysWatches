<?php

namespace App\Http\Controllers;

use App\Models\Brand;
use App\Filters\BrandSearch;
use Illuminate\Http\Request;
use Illuminate\Validation\Rule;


class BrandsController extends Controller
{
    public function index(Request $request)
    {

        $brands = Brand::where('active', true)->get()->map(function ($brand) {
            return $brand->map();
        });

        return response()->json($brands);
    }

    public function filter(Request $request)
    {
        $paginator = BrandSearch::apply($request)->paginate(12);
        $paginator->getCollection()->transform(function ($brand){
            return $brand->map();
        });

        return response()->json($paginator);
    }

    public function show(Brand $brand)
    {
        return response()->json($brand->map());
    }

    public function products(Brand $brand)
    {
        $paginator = $brand->products()->paginate(12);
        $paginator->getCollection()->transform(function ($product){
            return $product->map();
        });

        return response()->json($paginator);
    }


    public function store(Request $request)
    {
        $attributes = $this->validateBrand($request);

        $brand = Brand::create([
            'name' => $attributes['name'],
            'description' => $attributes['description'],
            'logo_url' => $attributes['logo_url']
        ]);

        return response()->json($brand, 201);
    }

    public function update(Request $request, Brand $brand)
    {
        $attributes = $this->validateBrand($request, $brand);
        $brand->name = $attributes['name'];
        $brand->description = $attributes['description'];
        $brand->logo_url = $attributes['logo_url'];
        $brand->update($attributes);
        $brand = $brand->fresh();
        return response()->json($brand);
    }

    public function deactivate(Brand $brand)
    {
        $brand->deactivate();
        return response()->noContent();
    }


    protected function validateBrand(Request $request)
    {
        return $request->validate([
            'name' => 'required|max:50',
            'description' => 'required|max:2000',
            'logo_url' => 'string|nullable',
        ]);
    }
}
