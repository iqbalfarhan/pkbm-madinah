<?php

namespace Database\Seeders;

use App\Models\Kelas;
use App\Models\Tingkat;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class TingkatSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        // Tingkat::factory(8)->create();

        foreach ([1, 2, 3, 4, 5, 6] as $tingkat) {
            Tingkat::factory(1)->create([
                'group' => 'SD',
                'name' => $tingkat,
            ])->each(function ($tingkat) {
                Kelas::factory(1)->create([
                    'tingkat_id' => $tingkat->id,
                    'name' => 'Kelas ' . $tingkat->name,
                ]);
            });
        }
    }
}
