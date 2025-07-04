<?php

namespace Database\Seeders;

use App\Models\Rapor;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class RaporSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        Rapor::factory(10)->create();
    }
}
