<?php

namespace Database\Factories;

use App\Models\Guru;
use App\Models\Tingkat;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Kelas>
 */
class KelasFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        return [
            'name' => fake()->word(),
            'tingkat_id' => Tingkat::pluck('id')->random(),
            'guru_id' => fake()->randomElement([Guru::pluck('id')->random(), null]),
        ];
    }
}
