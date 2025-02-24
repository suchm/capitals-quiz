<?php

namespace App\Http\Controllers\Api\v1;

use App\Http\Controllers\Controller;
use App\Http\Resources\Api\v1\CountryCapitalResource;
use App\Services\CountriesCapitalService;
use App\Traits\ApiResponses;
use Illuminate\Http\JsonResponse;

class CountriesCapitalController extends Controller
{
    use ApiResponses;

    public function index(CountriesCapitalService $countriesCapitalService): JsonResponse
    {
        $countries = $countriesCapitalService->getCountriesCapital();

        if (empty($countries)) {
            return $this->error("Failed to retrieve countries. Please try again later.", 500);
        }

        $countriesCollection = collect($countries)->map(fn ($item) => (object) $item);
        return $this->success(
            "Countries retrieved successfully",
            CountryCapitalResource::collection($countriesCollection)
        );
    }
}

