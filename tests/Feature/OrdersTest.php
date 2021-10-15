<?php

namespace Tests\Feature;

use Illuminate\Foundation\Testing\RefreshDatabase;
use Illuminate\Foundation\Testing\WithFaker;
use Illuminate\Support\Facades\Artisan;
use Tests\TestCase;
use App\Enums\Roles;
use App\Models\User;
use App\Models\Product;
use App\Models\Order;
use App\Models\OrderItem;
use Tests\Helpers\TestHelper;

class OrdersTest extends TestCase
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

    public function testCanAddOrder()
    {
        $customer = User::factory()->create();
        $product = Product::factory()->create();

        $response = $this->withHeaders([
            'Accept' => 'application/json',
            'Authorization' => 'Bearer ' . TestHelper::getBearerTokenForUser($this->user)
        ])->postJson(
            '/api/orders',
            [
                'orderItems' => [
                    ['id' => $product->id, 'quantity' => 1]
                ]
            ]
        );

        $response->assertCreated();
    }

    public function testCanGetOrders()
    {

        $order1 = Order::factory()->has(OrderItem::factory()->count(2))->create();
        $order2 = Order::factory()->has(OrderItem::factory()->count(3))->create();

        $response = $this->withHeaders([
            'Accept' => 'application/json',
            'Authorization' => 'Bearer ' . TestHelper::getBearerTokenForUser($this->user)
        ])->get('/api/orders');

        $response->assertOk();
    }

    // public function testCanFilterOrders()
    // {
    //     $response = $this->withHeaders([
    //         'Accept' => 'application/json',
    //         'Authorization' => 'Bearer ' . TestHelper::getBearerTokenForUser($this->user)
    //     ])->postJson(
    //         '/api/orders/search',
    //         [
    //            //TODO
    //         ]
    //     );

    //     $response->assertOk();
    // }

    public function testCanGetOrder()
    {

        $order = Order::factory()->has(OrderItem::factory()->count(2))->create();

        $response = $this->withHeaders([
            'Accept' => 'application/json',
            'Authorization' => 'Bearer ' . TestHelper::getBearerTokenForUser($this->user)
        ])->get('/api/orders/' . $order->id);
        $response->assertOk();
        $response->assertJsonCount(2, "items");
    }

    public function testCantAddInvalidProduct()
    {
        $customer = User::factory()->create();

        $response = $this->withHeaders([
            'Accept' => 'application/json',
            'Authorization' => 'Bearer ' . TestHelper::getBearerTokenForUser($this->user)
        ])->postJson(
            '/api/orders',
            [
                'orderItems' => [
                ]
            ]
        );

        $response->assertStatus(422);
    }
}
