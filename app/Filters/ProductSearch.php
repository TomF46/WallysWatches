<?php

namespace App\Filters;

use App\Models\Product;
use Illuminate\Http\Request;

class ProductSearch
{
    public static function apply(Request $filters)
    {
        $product = (new Product)->newQuery();

        $product->where('active', true);

        if ($filters->has('name')) {
            $product->where('name', 'like', "{$filters->input('name')}%");
        }

        if ($filters->has('productCode')) {
            $product->where('productCode', 'like', "{$filters->input('productCode')}%");
        }

        if ($filters->has('minCost')) {
            $product->where('price', '>=', (float)"{$filters->input('minCost')}%");
        }

        if ($filters->has('maxCost') && $filters->input('maxCost') != null ) {
            $product->where('price', '<=', (float)"{$filters->input('maxCost')}%");
        }

        return $product;
    }
}
