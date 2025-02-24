<?php

namespace App\Services;

use Illuminate\Support\Facades\Cache;
use Illuminate\Support\Facades\Http;
use Illuminate\Support\Facades\Log;
use Exception;

class CountriesCapitalService
{
    private string $apiEndpoint;

    public function __construct()
    {
        $this->apiEndpoint = config('services.countries_capital.api_endpoint');
    }

    public function getCountriesCapital(): array
    {
        return Cache::remember('countries_capital_list', now()->addHours(24), function () {
            try {
                $response = Http::timeout(10)->retry(3, 100)->get($this->apiEndpoint . '/countries/capital');

                if (!$response->successful()) {
                    throw new Exception("Failed to fetch country capitals. API returned status: " . $response->status());
                }

                return $response->json()['data'] ?? [];

            } catch (Exception $e) {
                Log::error("CountriesCapitalService Error: " . $e->getMessage());
                return [];
            }
        });
    }
}

