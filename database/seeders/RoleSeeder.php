<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Spatie\Permission\Models\Permission;
use Spatie\Permission\Models\Role;

class RoleSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $roles = [
            "superadmin",
            "admin",
            "guru",
            "walikelas",
            "orangtua",
        ];

        $permissions = [
            "halaman utama" => [
                "dashboard" => ["*"],
                "documentation" => ["*"],
                "profile" => ["*"],
                "menampilkan list anak saya" => ["orangtua"],
            ],

            // user
            "user" => [
                "menampilkan list user" => ["admin"],
                "menambahkan user baru" => ["admin"],
                "mengedit data user" => ["admin"],
                "menghapus user" => ["admin"],
                "mengembalikan user yang dihapus" => ["admin"],
                "menghapus permanen user" => ["admin"],
                "mengedit user sekaligus" => ["admin"],
                "menghapus user sekaligus" => ["admin"],
                "menghapus permanen user sekaligus" => ["admin"],
            ],

            // siswa
            "siswa" => [
                "menampilkan list siswa" => ["admin"],
                "menambahkan siswa baru" => ["admin"],
                "menampilkan detail siswa" => ["admin", "orangtua"],
                "mengedit data siswa" => ["admin"],
                "menghapus siswa" => ["admin"],
                "input ketidakhadiran siswa" => ["admin", "walikelas"],
                "input rapor siswa" => ["admin", "walikelas"],
                "input data sekolah asal" => ["admin"],
                "input data orang tua siswa" => ["admin"],
                "mengatur akun login orang tua siswa" => ["admin"],
                "mengatur dokumen kelengkapan siswa" => ["admin"],
            ],

            // kelas
            "kelas" => [
                "menampilkan list kelas" => ["admin"],
                "menambahkan kelas baru" => ["admin"],
                "mengedit data kelas" => ["admin", "guru"],
                "menghapus kelas" => ["admin"],
                "menampilkan list anggota kelas" => ["walikelas", "admin", "guru"],
            ],

            // guru
            "guru" => [
                "menampilkan list guru" => ["admin"],
                "menambahkan guru baru" => ["admin"],
                "menyimpan data guru" => ["admin"],
                "mengedit data guru" => ["admin"],
                "memperbarui data guru" => ["admin"],
                "menghapus guru" => ["admin"],
            ],

            // tahun ajaran
            "tahunajaran" => [
                "menampilkan list tahun ajaran" => ["admin"],
                "menambahkan tahun ajaran baru" => ["admin"],
                "menyimpan data tahun ajaran" => ["admin"],
                "mengedit data tahun ajaran" => ["admin"],
                "memperbarui data tahun ajaran" => ["admin"],
                "menghapus tahun ajaran" => ["admin"],
            ],

            // rapor
            "rapor" => [
                "menampilkan list rapor" => ["admin", "guru"],
                "menambahkan rapor baru" => ["admin", "guru"],
                "menyimpan data rapor" => ["admin", "guru"],
                "menampilkan detail rapor" => ["admin", "guru"],
                "mengedit data rapor" => ["admin", "guru"],
                "memperbarui data rapor" => ["admin", "guru"],
                "menghapus rapor" => ["admin", "guru"],
            ],

            // ekskul
            "ekskul" => [
                "menampilkan list ekskul" => ["admin", "guru"],
                "menambahkan ekskul baru" => ["admin", "guru"],
                "menyimpan data ekskul" => ["admin", "guru"],
                "menampilkan detail ekskul" => ["admin", "guru"],
                "mengedit data ekskul" => ["admin", "guru"],
                "memperbarui data ekskul" => ["admin", "guru"],
                "menghapus ekskul" => ["admin", "guru"],
                "mengatur ekskul siswa" => ["admin", "walikelas"],
            ],

            //mapel
            "mapel" => [
                "menampilkan list mata pelajaran" => ["admin", "guru"],
                "menambahkan mata pelajaran baru" => ["admin", "guru"],
                "menyimpan data mata pelajaran" => ["admin", "guru"],
                "menampilkan detail mata pelajaran" => ["admin", "guru"],
                "mengedit data mata pelajaran" => ["admin", "guru"],
                "memperbarui data mata pelajaran" => ["admin", "guru"],
                "menghapus mata pelajaran" => ["admin", "guru"],
            ],

            // ppdb
            "ppdb" => [
                "menampilkan list ppdb" => ["admin"],
                "menambahkan ppdb baru" => ["admin"],
                "menyimpan data ppdb" => ["admin"],
                "menampilkan detail ppdb" => ["admin"],
                "mengedit data ppdb" => ["admin"],
                "memperbarui data ppdb" => ["admin"],
                "menghapus ppdb" => ["admin"],
            ],

            //superadmin
            "superadmin" => [
                "mengatur role" => ["superadmin"],
                "mengatur permission" => ["superadmin"],
                "membuka database" => ["superadmin"],
            ]
        ];

        foreach ($roles as $role) {
            Role::create([
                'name' => $role
            ]);
        }

        foreach ($permissions as $group => $items) {
            foreach ($items as $name => $selectedRole) {
                $permission = Permission::create([
                    "group" => $group,
                    "name" => $name
                ]);
                $permission->syncRoles($selectedRole[0] == "*" ? $roles : $selectedRole);
            }
        }
    }
}
