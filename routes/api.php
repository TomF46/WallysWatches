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

Route::middleware(['auth:api'])->group(function () {  
    Route::get('/products', [App\Http\Controllers\ProductsController::class, 'index']);
    Route::post('/products/search', [App\Http\Controllers\ProductsController::class, 'filter']);
});

Route::middleware(['auth:api', 'admin'])->group(function () {
    Route::post('/products', [App\Http\Controllers\ProductsController::class, 'store']);
    Route::get('/products/{product}', [App\Http\Controllers\ProductsController::class, 'show']);
    Route::put('/products/{product}', [App\Http\Controllers\ProductsController::class, 'update']);
    Route::post('/products/{product}/deactivate', [App\Http\Controllers\ProductsController::class, 'deactivate']);
});
