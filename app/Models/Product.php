<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use App\Models\ProductImage;
use App\Models\Brand;

class Product extends Model
{
    use HasFactory;
    public $timestamps = false;
    protected $fillable = [
        'name',
        'brand_id',
        'productCode',
        'description',
        'price',
        'stock'
    ];

    public function brand()
    {
        return $this->belongsTo(Brand::class);
    }

    public function productImages()
    {
        return $this->hasMany(ProductImage::class);
    }

    protected function getImages()
    {
        return $this->productImages->map(function ($productImage) {
            return $productImage->map();
        });
    }

    public function map()
    {
        return [
            'id' => $this->id,
            'name' => "{$this->brand->name} {$this->name}",
            'model' => $this->name,
            'brandName' => $this->brand->name,
            'productCode' => $this->productCode,
            'description' => $this->description,
            'price' => $this->price,
            'stock' => $this->stock,
            'images' => $this->getImages()
        ];
    }

    public function deactivate()
    {
        $this->active = false;
        $this->save();
    }
}
