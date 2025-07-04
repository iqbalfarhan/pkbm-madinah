<?php

namespace Database\Seeders;

use App\Models\MapelGroup;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class MapelGroupSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $groups = [
            'Mapel Umum',
            'Tahsin',
            'Hafidz',
        ];

        foreach ($groups as $group) {
            MapelGroup::create([
                'name' => $group,
            ]);
        }
    }
}
