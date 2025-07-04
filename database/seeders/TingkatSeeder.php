<?php

namespace Database\Seeders;

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
            Tingkat::create([
                'group' => 'SD',
                'name' => $tingkat,
            ]);
        }
    }
}
