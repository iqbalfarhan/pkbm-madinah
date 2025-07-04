<?php

namespace Database\Factories;

use App\Models\Ekskul;
use App\Models\Siswa;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\EkskulSiswa>
 */
class EkskulSiswaFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        return [
            'ekskul_id' => Ekskul::pluck('id')->random(),
            'siswa_id' => Siswa::pluck('id')->random(),
            'kegiatan' => fake()->sentence(3),
        ];
    }
}
