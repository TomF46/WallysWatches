<?php

namespace App\Filters;

use App\Models\Brand;
use Illuminate\Http\Request;

class BrandSearch
{
    public static function apply(Request $filters)
    {
        $brands = (new Brand)->newQuery();

        $brands->where('active', true);

        if ($filters->has('name')) {
            $brands->where('name', 'like', "{$filters->input('name')}%");
        }
        
        return $brands;
    }
}
