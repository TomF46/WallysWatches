<?php

namespace Tests\Feature;

use Illuminate\Foundation\Testing\RefreshDatabase;
use Illuminate\Foundation\Testing\WithFaker;
use Illuminate\Support\Facades\Artisan;
use Tests\TestCase;
use App\Enums\Roles;
use App\Models\User;
use App\Models\Product;
use App\Models\Brand;
use Tests\Helpers\TestHelper;

class ProductsTest extends TestCase
{
    use RefreshDatabase;
    public $user;

    public function setUp(): void
    {
        parent::setUp();
        Artisan::call('passport:install');
        $this->user = User::factory()->create([
            'role' => Roles::Administrator
        ]);
    }

    public function testCanAddProduct()
    {
        $brand = Brand::factory()->create();

        $response = $this->withHeaders([
            'Accept' => 'application/json',
            'Authorization' => 'Bearer ' . TestHelper::getBearerTokenForUser($this->user)
        ])->postJson(
            '/api/products',
            [
                'name' => 'Le Locle',
                'brand_id' => $brand->id,
                'productCode' => 'TW3045',
                'description' => "A Tissot watch",
                'price' => 499.99,
                'stock' => 20,
                'images' => ['test']
            ]
        );

        $response->assertCreated();
    }

    public function testCanGetProducts()
    {
        $response = $this->withHeaders([
            'Accept' => 'application/json',
            'Authorization' => 'Bearer ' . TestHelper::getBearerTokenForUser($this->user)
        ])->get('/api/products');

        $response->assertOk();
    }

    public function testCanFilterProducts()
    {
        $response = $this->withHeaders([
            'Accept' => 'application/json',
            'Authorization' => 'Bearer ' . TestHelper::getBearerTokenForUser($this->user)
        ])->postJson(
            '/api/products/search',
            [
                'name' => 'Automatic',
                'productCode' => 'AW3045',
            ]
        );

        $response->assertOk();
    }

    public function testCanUpdateProduct()
    {
        $brand = Brand::factory()->create();
        $product = Product::factory()->create([
            'brand_id' => $brand->id
        ]);

        $response = $this->withHeaders([
            'Accept' => 'application/json',
            'Authorization' => 'Bearer ' . TestHelper::getBearerTokenForUser($this->user)
        ])->putJson(
            '/api/products/' . $product->id,
            [
                'name' => 'Swiss Watch',
                'brand_id' => $brand->id,
                'productCode' => 'SW2020',
                'description' => "A desc",
                'price' => 400,
                'stock' => 10,
                'images' => ['test']

            ]
        );
        $response->assertOk();
        $response->assertJson([
            'name' => 'Swiss Watch',
            'brand_id' => $brand->id,
            'productCode' => 'SW2020',
            'description' => "A desc",
            'price' => 400,
            'stock' => 10
        ]);
    }

    public function testCanGetProduct()
    {

        $product = Product::factory()->create();

        $response = $this->withHeaders([
            'Accept' => 'application/json',
            'Authorization' => 'Bearer ' . TestHelper::getBearerTokenForUser($this->user)
        ])->get('/api/products/' . $product->id);

        $response->assertOk();
        $response->assertJson([
            'id' => $product->id,
        ]);
    }

    public function testCanDeactivateProduct()
    {
        $product = Product::factory()->create([
            'name' => "Watch"
        ]);

        $response = $this->withHeaders([
            'Accept' => 'application/json',
            'Authorization' => 'Bearer ' . TestHelper::getBearerTokenForUser($this->user)
        ])->post('/api/products/' . $product->id . '/deactivate');

        $response->assertNoContent();
    }

    public function testCantAddInvalidProduct()
    {
        $response = $this->withHeaders([
            'Accept' => 'application/json',
            'Authorization' => 'Bearer ' . TestHelper::getBearerTokenForUser($this->user)
        ])->postJson(
            '/api/products',
            [
                'name' => null,
                'productCode' => 'XLM203',
                'description' => "A description",
                'price' => 499.99,
                'stock' => 20,
                'images' => ['test']
            ]
        );

        $response->assertStatus(422);
    }

    public function testCanAddProductWithImages()
    {
        $brand = Brand::factory()->create();

        $response = $this->withHeaders([
            'Accept' => 'application/json',
            'Authorization' => 'Bearer ' . TestHelper::getBearerTokenForUser($this->user)
        ])->postJson(
            '/api/products',
            [
                'name' => 'Le Locle',
                'brand_id' => $brand->id,
                'productCode' => 'TW3045',
                'description' => "A Tissot watch",
                'price' => 499.99,
                'stock' => 20,
                'images' => ['link1','link2','link3']
            ]
        );
        $response->assertCreated();

        $attributes = $response->decodeResponseJson();

        $response2 = $this->withHeaders([
            'Accept' => 'application/json',
            'Authorization' => 'Bearer ' . TestHelper::getBearerTokenForUser($this->user)
        ])->get('/api/products/' . $attributes["id"]);

        $response2->assertOk();
        $response2->assertJsonCount(3, "images");
    }

    public function testCanEditProductWithImages()
    {
        $brand = Brand::factory()->create();

        $response = $this->withHeaders([
            'Accept' => 'application/json',
            'Authorization' => 'Bearer ' . TestHelper::getBearerTokenForUser($this->user)
        ])->postJson(
            '/api/products',
            [
                'name' => 'Le Locle',
                'brand_id' => $brand->id,
                'productCode' => 'TW3045',
                'description' => "A Tissot watch",
                'price' => 499.99,
                'stock' => 20,
                'images' => ['link1','link2','link3']
            ]
        );
        $response->assertCreated();

        $attributes = $response->decodeResponseJson();

        $response2 = $this->withHeaders([
            'Accept' => 'application/json',
            'Authorization' => 'Bearer ' . TestHelper::getBearerTokenForUser($this->user)
        ])->get('/api/products/' . $attributes["id"]);

        $response2->assertOk();
        $response2->assertJsonCount(3, "images");

        $response3 = $this->withHeaders([
            'Accept' => 'application/json',
            'Authorization' => 'Bearer ' . TestHelper::getBearerTokenForUser($this->user)
        ])->putJson(
            '/api/products/' . $attributes["id"],
            [
                'name' => 'Le Locle',
                'brand_id' => $brand->id,
                'productCode' => 'TW3045',
                'description' => "A Tissot watch",
                'price' => 499.99,
                'stock' => 20,
                'images' => ['Link4']

            ]
        );
        $response3->assertOk();

        $response4 = $this->withHeaders([
            'Accept' => 'application/json',
            'Authorization' => 'Bearer ' . TestHelper::getBearerTokenForUser($this->user)
        ])->get('/api/products/' . $attributes["id"]);

        $response4->assertOk();
        $response4->assertJsonCount(1, "images");
    }
}
