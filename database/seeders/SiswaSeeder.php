<?php

namespace Database\Seeders;

use App\Models\Asalsekolah;
use App\Models\Ekskul;
use App\Models\EkskulSiswa;
use App\Models\Orangtua;
use App\Models\Siswa;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class SiswaSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        Siswa::factory(50)->create()->each(function ($siswa) {
            EkskulSiswa::factory(rand(1, 3))->create([
                'siswa_id' => $siswa->id,
                'kegiatan' => fake()->sentence(3),
            ]);
            Orangtua::factory()->create([
                'siswa_id' => $siswa->id,
                'father_address' => $siswa->address,
                'mother_address' => $siswa->address
            ]);
            Asalsekolah::factory()->create([
                'siswa_id' => $siswa->id,
            ]);
        });
    }
}
