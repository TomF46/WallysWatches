<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use App\Models\User;
use App\Models\OrderProduct;
use App\Models\Product;

class Order extends Model
{
    use HasFactory;
    public $timestamps = true;
    protected $table = 'orders';
    protected $fillable = [
        'user_id'
    ];

    public function user()
    {
        return $this->belongsTo(User::class);
    }

    public function orderProducts()
    {
        return $this->hasMany(OrderProduct::class);
    }

    public function map()
    {
        return [
            'id' => $this->id,
            'user' => $this->user,
            'status' => $this->status,
            'products' => $this->orderProducts
        ];
    }

    public function attatchProducts($products){
        foreach($products as $orderProduct){
            $product = Product::find($orderProduct['id']);

            OrderProduct::create([
                'order_id' => $this->id,
                'product_id' => $product->id,
                'quantity' => $orderProduct['quantity'],
                'cost' => $orderProduct['quantity'] * $product->price

            ]);
        }
    }
}
