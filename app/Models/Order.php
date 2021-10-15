<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use App\Models\User;
use App\Models\OrderItem;
use App\Models\Product;
use App\Enums\OrderStatuses;

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

    public function orderItems()
    {
        return $this->hasMany(OrderItem::class);
    }

    public function getMappedItems(){
        return $this->orderItems()->get()->transform(function ($order){
            return $order->map();
        });
    }

    public function getTotalCost(){
        return $this->orderItems()->sum('cost');
    }

    public function map()
    {
        return [
            'id' => $this->id,
            'user' => $this->user,
            'status' => $this->status,
            'statusText' => $this->getStatusText(),
            'items' => $this->getMappedItems(),
            'totalCost' => $this->getTotalCost()
        ];
    }

    public function getStatusText()
    {
        switch ($this->status) {
            case OrderStatuses::Processing:
                return "Processing";
                break;
            case ApplicationStatus::Dispatched:
                return "Dispatched";
                break;
            case ApplicationStatus::Complete:
                return "Complete";
                break;
            case ApplicationStatus::Cancelled:
                return "Cancelled";
                break;
        }
    }

    public function attatchProducts($products){
        foreach($products as $orderItem){
            $product = Product::find($orderItem['id']);

            OrderItem::create([
                'order_id' => $this->id,
                'product_id' => $product->id,
                'quantity' => $orderItem['quantity'],
                'cost' => $orderItem['quantity'] * $product->price

            ]);
        }
    }
}
