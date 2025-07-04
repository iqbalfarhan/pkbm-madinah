<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Tahunajaran>
 */
class TahunajaranFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        $year = fake()->year();
        $name = $year . '/' .$year+1;

        return [
            'name' => $name,
            'semester' => fake()->randomElement(['Semester 1', 'Semester 2']),
            'active' => fake()->boolean(),
        ];
    }
}
