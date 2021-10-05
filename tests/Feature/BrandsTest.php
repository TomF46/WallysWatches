<?php

namespace Tests\Feature;

use Illuminate\Foundation\Testing\RefreshDatabase;
use Illuminate\Foundation\Testing\WithFaker;
use Illuminate\Support\Facades\Artisan;
use Tests\TestCase;
use App\Enums\Roles;
use App\Models\User;
use App\Models\Brand;
use Tests\Helpers\TestHelper;

class BrandsTest extends TestCase
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

    public function testCanAddBrand()
    {
        $response = $this->withHeaders([
            'Accept' => 'application/json',
            'Authorization' => 'Bearer ' . TestHelper::getBearerTokenForUser($this->user)
        ])->postJson(
            '/api/brands',
            [
                'name' => 'Watches r us',
                'description' => "A watch brand",
                'logo_url' => null
            ]
        );

        $response->assertCreated();
    }

    public function testCanGetBrands()
    {
        $response = $this->withHeaders([
            'Accept' => 'application/json',
            'Authorization' => 'Bearer ' . TestHelper::getBearerTokenForUser($this->user)
        ])->get('/api/brands');

        $response->assertOk();
    }

    public function testCanFilterBrands()
    {
        $response = $this->withHeaders([
            'Accept' => 'application/json',
            'Authorization' => 'Bearer ' . TestHelper::getBearerTokenForUser($this->user)
        ])->postJson(
            '/api/brands/search',
            [
                'name' => 'Watches'
            ]
        );

        $response->assertOk();
    }

    public function testCanUpdateBrand()
    {
        $brand = Brand::factory()->create([
            'name' => 'Watchsmiths'
        ]);

        $response = $this->withHeaders([
            'Accept' => 'application/json',
            'Authorization' => 'Bearer ' . TestHelper::getBearerTokenForUser($this->user)
        ])->putJson(
            '/api/brands/' . $brand->id,
            [
                'name' => 'Watches r us',
                'description' => "A watch brand",
                'logo_url' => null
            ]
        );
        $response->assertOk();
        $response->assertJson([
            'name' => 'Watches r us',
            'description' => "A watch brand",
            'logo_url' => null
        ]);
    }

    public function testCanGetBrand()
    {

        $brand = Brand::factory()->create();

        $response = $this->withHeaders([
            'Accept' => 'application/json',
            'Authorization' => 'Bearer ' . TestHelper::getBearerTokenForUser($this->user)
        ])->get('/api/brands/' . $brand->id);

        $response->assertOk();
        $response->assertJson([
            'id' => $brand->id,
        ]);
    }

    public function testCanDeactivateBrand()
    {
        $brand = Brand::factory()->create();

        $response = $this->withHeaders([
            'Accept' => 'application/json',
            'Authorization' => 'Bearer ' . TestHelper::getBearerTokenForUser($this->user)
        ])->post('/api/brands/' . $brand->id . '/deactivate');

        $response->assertNoContent();
    }

    public function testCantAddInvalidBrand()
    {
        $response = $this->withHeaders([
            'Accept' => 'application/json',
            'Authorization' => 'Bearer ' . TestHelper::getBearerTokenForUser($this->user)
        ])->postJson(
            '/api/brands',
            [
                'name' => null,
                'description' => "A description",
                'logo_url' => null
            ]
        );

        $response->assertStatus(422);
    }
}
