<?php

namespace Database\Seeders;

use App\Models\EkskulSiswa;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class EkskulSiswaSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        EkskulSiswa::factory(50)->create();
    }
}
