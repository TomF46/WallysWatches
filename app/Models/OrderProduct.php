<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use App\Models\Order;
use App\Models\Product;

class OrderProduct extends Model
{
    use HasFactory;
    public $timestamps = false;
    protected $table = 'orders_products';
    protected $fillable = [
        'order_id',
        'product_id',
        'quantity',
        'cost'
    ];

    public function order()
    {
        return $this->belongsTo(Order::class);
    }

    public function product()
    {
        return $this->hasOne(Product::class);
    }

    public function map()
    {
        return [
            'id' => $this->id,
            'order' => $this->order,
            'product' => $this->product
        ];
    }
}
