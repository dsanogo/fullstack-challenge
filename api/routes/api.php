<?php

use App\Http\Controllers\UserController;
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

Route::get('/', function () {
    return response()->json([
        'message' => 'all systems are a go',
        'users' => \App\Models\User::all(),
    ]);
});

Route::group(['prefix' => 'users'], function() {
   Route::get('/', [UserController::class, 'index'])->name('users.index');
   Route::get('/{id}', [UserController::class, 'show'])->name('users.show');
   Route::post('/{id}/weather', [UserController::class, 'storeWeatherData'])->name('users.storeWeatherData');
});
