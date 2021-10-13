<?php

namespace App\Filters;

use App\Models\Order;
use Illuminate\Http\Request;

class OrderSearch
{
    public static function apply(Request $filters)
    {
        $orders = (new Order)->newQuery();
        //Return everything for now as placeholder
        return $orders;
    }
}
