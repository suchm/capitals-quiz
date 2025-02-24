<?php

namespace Tests\Feature;

use Illuminate\Foundation\Testing\RefreshDatabase;
use Tests\TestCase;
use App\Models\User;

class AuthTest extends TestCase
{
    use RefreshDatabase;

    /** @test */
    public function user_can_register_successfully()
    {
        $response = $this->postJson('/api/register', [
            'name' => 'Sam Smith',
            'email' => 'sam@gmail.com',
            'password' => 'password123',
            'password_confirmation' => 'password123',
        ]);

//        dump($response->json());

        $response->assertStatus(201)
            ->assertJsonStructure([
                'message',
                'accessToken'
            ]);
    }

    /** @test */
    public function user_cannot_register_with_existing_email()
    {
        User::factory()->create(['email' => 'sam@gmail.com']);

        $response = $this->postJson('/api/register', [
            'name' => 'Sam Smith',
            'email' => 'sam@gmail.com',
            'password' => 'password123',
            'password_confirmation' => 'password123',
        ]);

        $response->assertStatus(422)
            ->assertJsonValidationErrors(['email']);
    }

    /** @test */
    public function user_can_login_with_correct_credentials()
    {
        User::factory()->create([
            'email' => 'sam@gmail.com',
            'password' => bcrypt('password123'),
        ]);

        $response = $this->postJson('/api/login', [
            'email' => 'sam@gmail.com',
            'password' => 'password123',
        ]);

//        dump($response->json());

        $response->assertStatus(200)
            ->assertJsonStructure([
                'accessToken',
                'token_type',
            ]);
    }

    /** @test */
    public function user_cannot_login_with_wrong_credentials()
    {
        User::factory()->create([
            'email' => 'sam@gmail.com',
            'password' => bcrypt('password123'),
        ]);

        $response = $this->postJson('/api/login', [
            'email' => 'sam@gmail.com',
            'password' => 'wrongpassword',
        ]);

        $response->assertStatus(401);
    }

    /** @test */
    public function authenticated_user_can_access_protected_route()
    {
        $user = User::factory()->create();
        $token = $user->createToken('TestToken')->plainTextToken;

        $response = $this->withHeaders([
            'Authorization' => "Bearer $token",
        ])->getJson('/api/user');

        $response->assertStatus(200);
    }

    /** @test */
    public function unauthenticated_user_cannot_access_protected_route()
    {
        $response = $this->getJson('/api/user');
        $response->assertStatus(401);
    }
}
