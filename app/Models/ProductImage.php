<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use App\Models\Product;

class ProductImage extends Model
{
    use HasFactory;
    public $timestamps = false;
    protected $table = 'product_images';
    protected $fillable = [
        'product_id',
        'image_url'
    ];

    public function product()
    {
        return $this->belongsTo(Product::class);
    }

    public function map()
    {
        return [
            'id' => $this->id,
            'url' => $this->image_url,
        ];
    }

    public function deactivate()
    {
        $this->active = false;
        $this->save();
    }
}
