<?php

namespace Database\Seeders;

use App\Models\Tahunajaran;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class TahunajaranSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        // Tahunajaran::factory()->count(5)->create();

        foreach ([2023,2024,2025] as $tahun) {
            foreach (["genap", "ganjil"] as $semester) {
                Tahunajaran::create([
                    'name' => $tahun . "/" . $tahun + 1,
                    'semester' => $semester,
                ]);
            }
        }
    }
}
