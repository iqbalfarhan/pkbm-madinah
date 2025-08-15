<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;
use Illuminate\Support\Str;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Berita>
 */
class BeritaFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        $judul = fake()->sentence();
        $slug = Str::slug($judul);

        return [
            'user_id' => 1,
            'judul' => $judul,
            'slug' => $slug,
            'content' => fake()->paragraph(),
        ];
    }
}
