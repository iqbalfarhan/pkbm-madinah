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
                "edit profile" => ["*"],
                "edit password" => ["*"],
                "edit appearance" => ["*"],
                "edit sekolah" => ["superadmin", "admin"],
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
                "mengatur ketidakhadiran siswa" => ["admin", "walikelas"],
                "mengatur data orangtua siswa" => ["admin"],
                "mengatur akun login orangtua siswa" => ["admin"],
                "mengatur dokumen kelengkapan siswa" => ["admin"],
            ],

            // kelas
            "kelas" => [
                "menampilkan kelas walikelas" => ["admin", "walikelas"],
                "menampilkan list kelas" => ["admin"],
                "menampilkan detail kelas" => ["admin", "guru", "walikelas"],
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
                "menampilkan list rapor" => ["admin", "walikelas"],
                "menambahkan rapor baru" => ["admin", "walikelas"],
                "menampilkan detail rapor" => ["admin", "walikelas", "orangtua"],
                "mengedit data rapor" => ["admin", "walikelas"],
                "menghapus rapor" => ["admin"],
                "berkomentar di rapor siswa" => ["admin", "walikelas", "orangtua"],
            ],

            // ekskul
            "ekskul" => [
                "menampilkan list ekskul" => ["admin", "guru"],
                "menambahkan ekskul baru" => ["admin", "guru"],
                "menampilkan detail ekskul" => ["admin", "guru"],
                "mengedit data ekskul" => ["admin", "guru"],
                "menghapus ekskul" => ["admin", "guru"],
            ],

            //mapel
            "mapel" => [
                "menampilkan mata pelajaran yang saya ajar" => ["admin", "guru"],
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
                "pengaturan ppdb" => ["admin"],
                "menampilkan list ppdb" => ["admin"],
                "menambahkan ppdb baru" => ["admin", "orangtua"],
                "menampilkan detail ppdb" => ["admin", "orangtua"],
                "mengedit data ppdb" => ["admin", "orangtua"],
                "menghapus siswa ppdb" => ["admin"],
            ],

            //superadmin
            "superadmin" => [
                "mengatur role permission" => ["*"],
                "membuka database" => ["*"],
            ],

            //widgets
            "widget" => [
                "menampilkan widget admin" => ["admin"],
                "menampilkan widget list anak" => ["orangtua"],
                "menampilkan widget kelas walikelas" => ["walikelas"],
                "menampilkan widget list pelajaran" => ["guru"],
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
