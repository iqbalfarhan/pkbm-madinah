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
                "value" => "PKBM AL-MADINAH BALIKPAPAN"
            ],
            [
                "key" => "SEKOLAH_ADDRESS",
                "value" => "Jalan Karang Jawa RT. 10 No. 55 Karang Jati (TK) --- Jalan Telindung Gang Melati rt. 88 no. 47 (PKBM)"
            ],
            [
                "key" => "SEKOLAH_PHONE",
                "value" => "085553001020"
            ],
            [
                "key" => "SEKOLAH_WEBSITE",
                "value" => "sekolahislamalmadinah.sch.id"
            ],
            [
                "key" => "SEKOLAH_EMAIL",
                "value" => "pkbmalmadinah2023@gmail.com"
            ],
            [
                "key" => "PPDB_OPEN",
                "value" => "false"
            ],
            [
                "key" => "PPDB_TAHUNAJARAN_ID",
                "value" => null
            ]
        ];

        Setting::insert($settings);
    }
}
