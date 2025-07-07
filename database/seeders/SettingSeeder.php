<?php

namespace Database\Seeders;

use App\Models\Setting;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class SettingSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $settings = [
            [
                "key" => "SEKOLAH_NAME",
                "value" => "SMK Negeri 10 Semarang"
            ],
            [
                "key" => "SEKOLAH_ADDRESS",
                "value" => "Jl. Raya Semarang-Surakarta KM. 7, Kec. Semarang Tengah, Kota Semarang, Jawa Tengah 50132"
            ],
            [
                "key" => "SEKOLAH_PHONE",
                "value" => "024-654321"
            ],
            [
                "key" => "SEKOLAH_EMAIL",
                "value" => "smkn10@gmail.com"
            ],
            [
                "key" => "PPDB_OPEN",
                "value" => "false"
            ],
            [
                "key" => "PPDB_TAHUNAJARAN_id",
                "value" => null
            ]
        ];

        Setting::insert($settings);
    }
}
