<?php

namespace App\Filters;

use App\Models\Product;
use Illuminate\Http\Request;

class ProductSearch
{
    public static function apply(Request $filters)
    {
        $products = (new Product)->newQuery();

        $products->where('active', true);

        if ($filters->has('name')) {
            $products->where('name', 'like', "{$filters->input('name')}%")
            ->orWhereHas('brand', function($query) use ($filters) { 
                $query->where('name', 'like', "{$filters->input('name')}%");
            });
        }

        if ($filters->has('productCode')) {
            $products->where('productCode', 'like', "{$filters->input('productCode')}%");
        }

        if ($filters->has('minCost')) {
            $products->where('price', '>=', (float)"{$filters->input('minCost')}%");
        }

        if ($filters->has('maxCost') && $filters->input('maxCost') != null ) {
            $products->where('price', '<=', (float)"{$filters->input('maxCost')}%");
        }

        return $products;
    }
}
