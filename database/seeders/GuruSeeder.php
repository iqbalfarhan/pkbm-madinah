<?php

namespace Database\Seeders;

use App\Models\Guru;
use App\Models\Pelajaran;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class GuruSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        Guru::factory(3)->create();
    }
}
