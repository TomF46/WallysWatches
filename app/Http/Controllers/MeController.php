<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

class MeController extends Controller
{
    public function isAdmin(Request $request)
    {
        return response()->json(
            [
                'isAdmin' => $request->user()->isAdmin()
            ]
        );
    }

    public function orders(Request $request)
    {
        $orders = $request->user()->orders()->paginate(10);
        $orders->transform(function ($order){
            return $order->map();
        });

        return response()->json($orders);
    }
}
