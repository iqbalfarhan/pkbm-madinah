<?php

namespace Database\Factories;

use App\Models\User;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Guru>
 */
class GuruFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        return [
            'name' => fake()->name(),
            'nip' => fake()->unique()->numerify('##########'),
            'address' => fake()->address(),
            'phone' => fake()->unique()->numerify('+628##########'),
            'email' => fake()->unique()->safeEmail(),
            'photo' => null,
            'gender' => fake()->randomElement(['laki-laki', 'perempuan']),
            'active' => fake()->boolean(),
            'user_id' => fake()->randomElement([User::pluck('id')->random(), null]),
        ];
    }
}
