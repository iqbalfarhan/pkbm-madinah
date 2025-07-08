<?php

namespace Database\Factories;

use App\Models\Siswa;
use App\Models\Tahunajaran;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Ketidakhadiran>
 */
class KetidakhadiranFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        return [
            'tahunajaran_id' => Tahunajaran::pluck('id')->random(),
            'siswa_id' => Siswa::pluck('id')->random(),
            'date' => fake()->date(),
            'reason' => fake()->sentence(1),
        ];
    }
}
