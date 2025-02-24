<?php

namespace Tests\Feature;

use App\Models\User;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Illuminate\Support\Facades\Http;
use Laravel\Sanctum\Sanctum;
use Tests\TestCase;

class CountriesCapitalTest extends TestCase
{
    use RefreshDatabase;

    /** @test */
    public function unauthenticated_users_cannot_access_countries_capital_endpoint()
    {
        $response = $this->getJson('/api/v1/countries/capital');

        $response->assertStatus(401); // Expecting Unauthorized
    }

    /** @test */
    public function authenticated_users_can_access_countries_capital_endpoint()
    {
        $user = User::factory()->create();
        Sanctum::actingAs($user); // Ensures the user is authenticated

        Http::fake([
            '*' => Http::response(['data' => [['country' => 'France', 'capital' => 'Paris']]], 200),
        ]);

        $response = $this->getJson('/api/v1/countries/capital');

        $response->assertStatus(200)
            ->assertJson([
                'message' => "Countries retrieved successfully",
                'data' => [['country' => 'France', 'capital' => 'Paris']],
            ]);
    }

    /** @test */
    public function it_handles_empty_api_response_gracefully()
    {
        $user = User::factory()->create();
        Sanctum::actingAs($user);

        Http::fake([
            '*' => Http::response(['data' => []], 200),
        ]);

        $response = $this->getJson('/api/v1/countries/capital');

        $response->assertStatus(200)
            ->assertJson([
                'message' => "Countries retrieved successfully",
                'data' => [],
            ]);
    }

    /** @test */
    public function it_handles_api_failure_gracefully()
    {
        $user = User::factory()->create();
        Sanctum::actingAs($user);

        Http::fake([
            '*' => Http::response([], 500), // Simulating API failure
        ]);

        $response = $this->getJson('/api/v1/countries/capital');

        $response->assertStatus(500)
            ->assertJson([
                'message' => "Failed to retrieve countries. Please try again later."
            ]);
    }
}
