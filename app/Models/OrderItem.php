<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use App\Models\Order;
use App\Models\Product;

class OrderItem extends Model
{
    use HasFactory;
    public $timestamps = false;
    protected $table = 'order_items';
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
        return $this->hasOne(Product::class, 'id');

    }

    public function map()
    {
        return [
            'id' => $this->id,
            'order' => $this->order,
            'product' => $this->product->map(),
            'quantity' => $this->quantity,
            'cost' => $this->cost
        ];
    }
}
