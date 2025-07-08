<?php

namespace Database\Seeders;

use App\Models\Ketidakhadiran;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class KetidakhadiranSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        Ketidakhadiran::factory(20)->create();
    }
}
