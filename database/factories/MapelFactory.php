<?php

namespace Database\Factories;

use App\Models\Guru;
use App\Models\MapelGroup;
use App\Models\Tingkat;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Mapel>
 */
class MapelFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        return [
            'name' => fake()->sentence(),
            'description' => fake()->paragraph(3),
            'photo' => null,
            'tingkat_id' => Tingkat::pluck('id')->random(),
            'mapel_group_id' => MapelGroup::pluck('id')->random(),
        ];
    }
}
