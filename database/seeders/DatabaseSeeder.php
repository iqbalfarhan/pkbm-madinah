<?php

namespace Database\Seeders;

use App\Models\Tingkat;
use App\Models\User;
// use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     */
    public function run(): void
    {
        $this->call([
            UserSeeder::class,
            TahunajaranSeeder::class,
            GuruSeeder::class,
            TingkatSeeder::class,
            MapelGroupSeeder::class,
            MapelSeeder::class,
            MaterialSeeder::class,
            KelasSeeder::class,
            EkskulSeeder::class,
            SiswaSeeder::class,
            RaporSeeder::class,
        ]);
    }
}
