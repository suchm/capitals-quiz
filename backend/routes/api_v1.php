<?php

use App\Http\Controllers\Api\v1\CountriesCapitalController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;


Route::middleware('auth:sanctum')->group(function () {
    Route::get('/countries/capital', [CountriesCapitalController::class, 'index']);
});
