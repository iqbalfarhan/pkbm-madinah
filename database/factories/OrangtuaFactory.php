<?php

namespace Database\Factories;

use App\Models\Siswa;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Orangtua>
 */
class OrangtuaFactory extends Factory
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
            'father_name' => fake()->name('male'),
            'father_address'=> fake()->address(),
            'father_phone' => fake()->phoneNumber(),
            'father_ocupation' => fake()->jobTitle(),
            'mother_name' => fake()->name('female'),
            'mother_address' => fake()->address(),
            'mother_phone' => fake()->phoneNumber(),
            'mother_ocupation' => fake()->jobTitle(),
        ];
    }
}
