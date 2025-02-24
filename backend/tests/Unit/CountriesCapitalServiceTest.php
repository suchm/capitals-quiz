<?php

namespace Tests\Unit;

use App\Services\CountriesCapitalService;
use Illuminate\Support\Facades\Cache;
use Illuminate\Support\Facades\Http;
use Illuminate\Support\Facades\Log;
use Tests\TestCase;

class CountriesCapitalServiceTest extends TestCase
{
    protected function tearDown(): void
    {
        parent::tearDown();

        // Reset HTTP and Cache fakes after each test to prevent issues
        Http::flush();
        Cache::flush();
    }

    /** @test */
    public function it_fetches_countries_capital_from_external_api()
    {
        Cache::shouldReceive('remember')
            ->once()
            ->andReturn([
                ['country' => 'France', 'capital' => 'Paris']
            ]);

        Http::fake([
            '*' => Http::response(['data' => [['country' => 'France', 'capital' => 'Paris']]], 200),
        ]);

        $service = new CountriesCapitalService();
        $data = $service->getCountriesCapital();

        $this->assertNotEmpty($data);
        $this->assertEquals('France', $data[0]['country']);
        $this->assertEquals('Paris', $data[0]['capital']);
    }

    /** @test */
    public function it_returns_cached_data_if_available()
    {
        Cache::shouldReceive('remember')
            ->once()
            ->andReturn([
                ['country' => 'Germany', 'capital' => 'Berlin']
            ]);

        $service = new CountriesCapitalService();
        $data = $service->getCountriesCapital();

        $this->assertEquals('Germany', $data[0]['country']);
        $this->assertEquals('Berlin', $data[0]['capital']);
    }

    /** @test */
    public function it_handles_api_failure_and_logs_error()
    {
        Cache::shouldReceive('remember')
            ->once()
            ->andReturn([]);

        Http::fake([
            '*' => Http::response([], 500),
        ]);

        Log::shouldReceive('error')->once();

        $service = new CountriesCapitalService();
        $data = $service->getCountriesCapital();

        $this->assertEmpty($data);
    }
}
