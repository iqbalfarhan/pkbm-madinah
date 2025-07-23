<?php

namespace Database\Seeders;

use App\Models\Mapel;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class MapelSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $mapels = [
            "Matematika",
            "Bahasa Indonesia",
            "Bahasa Inggris",
            "IPA",
            "IPS",
            "Seni Budaya",
            "Pendidikan Jasmani",
            "Pendidikan Kewarganegaraan",
            "Pendidikan Agama",
            "Prakarya",
            "Pendidikan Pancasila",
        ];

        foreach ($mapels as $mapel) {
            Mapel::factory()->create([
                'name' => $mapel,
            ]);
        }
    }
}
