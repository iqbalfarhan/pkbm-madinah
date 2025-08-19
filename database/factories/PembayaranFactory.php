<?php

namespace Database\Factories;

use App\Models\Siswa;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Pembayaran>
 */
class PembayaranFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        $paid = fake()->boolean();

        return [
            'siswa_id' => Siswa::pluck('id')->random(),
            'keterangan' => fake()->sentence(10),
            'nominal' => fake()->numerify('#######'),
            'paid' => $paid,
            'paid_at' => $paid ? now() : null,
        ];
    }
}
