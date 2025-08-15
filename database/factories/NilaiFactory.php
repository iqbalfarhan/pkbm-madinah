<?php

namespace Database\Factories;

use App\Models\Pelajaran;
use App\Models\Siswa;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Nilai>
 */
class NilaiFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        return [
            'pelajaran_id' => Pelajaran::pluck('id')->random(),
            'siswa_id' => Siswa::pluck('id')->random(),
            'nilai_tugas' => fake()->randomFloat(2, 0, 100),
            'nilai_evaluasi' => fake()->randomFloat(2, 0, 100),
        ];
    }
}
