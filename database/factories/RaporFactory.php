<?php

namespace Database\Factories;

use App\Models\Siswa;
use App\Models\Tahunajaran;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Rapor>
 */
class RaporFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        return [
            'siswa_id' => Siswa::pluck('id')->random(),
            'tahunajaran_id' => Tahunajaran::pluck('id')->random(),
            'jenis' => fake()->randomElement(['perkembangan']),
            'data' => null,
            'pdf_path' => fake()->filePath(),
        ];
    }
}
