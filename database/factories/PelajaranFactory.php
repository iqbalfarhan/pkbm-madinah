<?php

namespace Database\Factories;

use App\Models\Guru;
use App\Models\Kelas;
use App\Models\Mapel;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Pelajaran>
 */
class PelajaranFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        return [
            'mapel_id' => Mapel::pluck('id')->random(),
            'guru_id' => Guru::pluck('id')->random(),
            'kelas_id' => Kelas::pluck('id')->random(),
        ];
    }
}
