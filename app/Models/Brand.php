<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use App\Models\Product;

class Brand extends Model
{
    use HasFactory;
    public $timestamps = false;
    protected $table = 'brands';
    protected $fillable = [
        'name',
        'description',
        'logo_url'
    ];

    public function products()
    {
        return $this->hasMany(Product::class);
    }

    public function map()
    {
        return [
            'id' => $this->id,
            'name' => $this->name,
            'description' => $this->description,
            'logoUrl' => $this->logo_url,
        ];
    }

    public function deactivate()
    {
        $this->active = false;
        $this->save();
    }
}
