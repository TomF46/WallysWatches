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
            return $productImage->image_url;
        });
    }

    protected function getBrand()
    {
        return $this->brand->map();
    }

    public function map()
    {
        return [
            'id' => $this->id,
            'name' => $this->name,
            'brand' => $this->getBrand(),
            'fullName' => "{$this->brand->name} {$this->name}",
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

    public function attatchImages($images){
        $this->removeExistingImages();
        foreach($images as $url){
            ProductImage::create([
                "product_id" => $this->id,
                "image_url" => $url
            ]);
        }
    }

    protected function removeExistingImages(){
        foreach($this->productImages as $image){
            $image->delete();
        }
    }
}
