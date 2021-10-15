<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| is assigned the "api" middleware group. Enjoy building your API!
|
*/

Route::group([
    'prefix' => 'auth'
], function () {
    Route::post('login', [App\Http\Controllers\AuthController::class, 'login']);
    Route::post('register', [App\Http\Controllers\AuthController::class, 'register']);
    
    Route::group([
        'middleware' => ['auth:api']
    ], function () {
        Route::get('logout', [App\Http\Controllers\AuthController::class, 'logout']);
        Route::get('user', [App\Http\Controllers\AuthController::class, 'user']);
        Route::post('changePassword', [App\Http\Controllers\AuthController::class, 'changePassword']);
    });
});

//Unauthenticated routes
Route::get('/products', [App\Http\Controllers\ProductsController::class, 'index']);
Route::post('/products/search', [App\Http\Controllers\ProductsController::class, 'filter']);
Route::get('/products/showcase', [App\Http\Controllers\ProductsController::class, 'showcase']);
Route::get('/products/{product}', [App\Http\Controllers\ProductsController::class, 'show']);

Route::get('/brands', [App\Http\Controllers\BrandsController::class, 'index']);
Route::post('/brands/search', [App\Http\Controllers\BrandsController::class, 'filter']);
Route::get('/brands/{brand}', [App\Http\Controllers\BrandsController::class, 'show']);
Route::get('/brands/{brand}/products', [App\Http\Controllers\BrandsController::class, 'products']);


Route::middleware(['auth:api'])->group(function () {  
    Route::get('/me/isAdmin', [App\Http\Controllers\MeController::class, 'isAdmin']);
    Route::get('/me/orders', [App\Http\Controllers\MeController::class, 'orders']);

    Route::get('/orders', [App\Http\Controllers\OrdersController::class, 'index']);
    Route::post('/orders', [App\Http\Controllers\OrdersController::class, 'store']);
    Route::post('/orders/search', [App\Http\Controllers\OrdersController::class, 'filter']);
    Route::get('/orders/{order}', [App\Http\Controllers\OrdersController::class, 'show']);

});

Route::middleware(['auth:api', 'admin'])->group(function () {
    Route::post('/products', [App\Http\Controllers\ProductsController::class, 'store']);
    Route::put('/products/{product}', [App\Http\Controllers\ProductsController::class, 'update']);
    Route::post('/products/{product}/deactivate', [App\Http\Controllers\ProductsController::class, 'deactivate']);

    Route::post('/productImages', [App\Http\Controllers\ProductImagesController::class, 'store']);


    Route::get('/customers', [App\Http\Controllers\CustomerController::class, 'index']);
    Route::get('/customers/{user}', [App\Http\Controllers\CustomerController::class, 'show']);
    Route::put('/customers/{user}', [App\Http\Controllers\CustomerController::class, 'update']);
    Route::post('/customers/{user}/changePassword', [App\Http\Controllers\CustomerController::class, 'changePassword']);
    Route::post('/customers/{user}/deactivate', [App\Http\Controllers\CustomerController::class, 'deactivate']);
    Route::post('/customers/search', [App\Http\Controllers\CustomerController::class, 'filter']);

    Route::post('/brands', [App\Http\Controllers\BrandsController::class, 'store']);
    Route::put('/brands/{brand}', [App\Http\Controllers\BrandsController::class, 'update']);
    Route::post('/brands/{brand}/deactivate', [App\Http\Controllers\BrandsController::class, 'deactivate']);

    Route::post('/brandLogos', [App\Http\Controllers\BrandLogosController::class, 'store']);
});
