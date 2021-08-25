<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use App\Models\productImage;

class Product extends Model
{
    use HasFactory;
    public $timestamps = false;
    protected $fillable = [
        'name',
        'productCode',
        'description',
        'price',
        'stock'
    ];

    public function productImages()
    {
        return $this->hasMany(ProductImage::class);
    }

    public function map()
    {
        return [
            'id' => $this->id,
            'name' => $this->name,
            'productCode' => $this->productCode,
            'description' => $this->description,
            'price' => $this->price,
            'stock' => $this->stock
        ];
    }

    public function deactivate()
    {
        $this->active = false;
        $this->save();
    }
}
