<?php

namespace Database\Factories;

use App\Models\Product;
use Illuminate\Database\Eloquent\Factories\Factory;

class ProductFactory extends Factory
{
    /**
     * The name of the factory's corresponding model.
     *
     * @var string
     */
    protected $model = Product::class;

    /**
     * Define the model's default state.
     *
     * @return array
     */
    public function definition()
    {
        return [
            'name' => $this->faker->word(),
            'productCode' => $this->faker->unique()->isbn10(),
            'description' => $this->faker->realText(),
            'price' => $this->faker->numberBetween(1,25000),
            'stock' => $this->faker->numberBetween(1,100),
            'active' => true
        ];
    }
}
