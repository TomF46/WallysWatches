<?php

namespace App\Http\Controllers;

use App\Models\Order;
use App\Filters\OrderSearch;
use Illuminate\Http\Request;
use Illuminate\Validation\Rule;


class OrdersController extends Controller
{
    public function index(Request $request)
    {

        $orders = Order::all()->map(function ($order) {
            return $order->map();
        });

        return response()->json($orders);
    }

    public function filter(Request $request)
    {
        $paginator = OrderSearch::apply($request)->paginate(20);
        $paginator->getCollection()->transform(function ($order){
            return $order->map();
        });

        return response()->json($paginator);
    }

    public function show(Order $order)
    {
        return response()->json($order->map());
    }

    public function store(Request $request)
    {
        $attributes = $this->validateOrder($request);
        $user = $request->user();

        $order = Order::create([
            'user_id' => $user->id
        ]);

        $order->attatchProducts($attributes['orderItems']);
        $order = $order->fresh();

        return response()->json($order, 201);
    }

    protected function validateOrder(Request $request)
    {
        return $request->validate([
            'orderItems' => 'required|array'
        ]);
    }
}
