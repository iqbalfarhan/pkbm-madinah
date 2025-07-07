<?php

namespace Database\Factories;

use App\Models\Mapel;
use App\Models\Pelajaran;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\material>
 */
class MaterialFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        return [
            'perlajaran_id' => Pelajaran::pluck('id')->random(),
            'title' => fake()->sentence(3),
            'description' => fake()->sentence(10),
            'url' => null,
        ];
    }
}
