<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Enums\Roles;
use App\Models\User;
use App\Models\Brand;
use App\Models\Product;
use App\Models\ProductImage;

class AdvancedSeeder extends Seeder
{
    /**
     * Seed the application's database.
     *
     * @return void
     */
    public function run()
    {
        User::create([
            'firstName' => 'Admin',
            'lastName' => 'User',
            'email' => env('ADMIN_EMAIL'),
            'password' => bcrypt(env('ADMIN_PASSWORD')),
            'role' => Roles::Administrator
        ]);

        $brand = Brand::factory()->create();

        $count = 0;
        while($count < 20) {
            $product = Product::factory()->create([
                'brand_id' => $brand->id
            ]);
            $image = ProductImage::factory()->make();
            $product->productImages()->save($image);
            $count++;
        }
    }
}
