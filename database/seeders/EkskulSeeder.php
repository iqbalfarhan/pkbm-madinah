<?php

namespace Database\Seeders;

use App\Models\Ekskul;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class EkskulSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        // Ekskul::factory(10)->create();

        $ekstrakurikuler = [
            ['name' => 'Pramuka'],
            ['name' => 'Paskibra'],
            ['name' => 'PMR'],
            ['name' => 'Rohis'],
            ['name' => 'English Club'],
            ['name' => 'Futsal'],
            ['name' => 'Basket'],
            ['name' => 'Volly'],
            ['name' => 'Tari Tradisional'],
            ['name' => 'KIR'],
            ['name' => 'Teater'],
            ['name' => 'Musik / Band'],
            ['name' => 'IT Club'],
            ['name' => 'Jurnalistik'],
            ['name' => 'Fotografi & Videografi'],
        ];

        Ekskul::insert($ekstrakurikuler);
    }
}
