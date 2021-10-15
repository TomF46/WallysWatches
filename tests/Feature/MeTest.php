<?php

namespace Tests\Feature;

use Illuminate\Foundation\Testing\RefreshDatabase;
use Illuminate\Foundation\Testing\WithFaker;
use Illuminate\Support\Facades\Artisan;
use Tests\TestCase;
use App\Enums\Roles;
use App\Models\User;
use App\Models\Order;
use App\Models\OrderProduct;
use Tests\Helpers\TestHelper;

class MeTest extends TestCase
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

    public function testCanGetCurrentUsersOrders()
    {

        $order1 = Order::factory()->has(OrderProduct::factory()->count(2))->create([
            'user_id' => $this->user->id
        ]);
        $order2 = Order::factory()->has(OrderProduct::factory()->count(3))->create([
            'user_id' => $this->user->id
        ]);

        $response = $this->withHeaders([
            'Accept' => 'application/json',
            'Authorization' => 'Bearer ' . TestHelper::getBearerTokenForUser($this->user)
        ])->get('/api/me/orders');

        $response->assertOk();
        $response->assertJsonCount(2, 'data');
    }
}
