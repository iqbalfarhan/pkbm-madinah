<?php

namespace Database\Seeders;

use App\Models\User;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class UserSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $user = User::factory()->create([
            'name' => 'Iqbal Farhan Syuhada',
            'email' => 'iqbalfarhan1996@gmail.com',
            'password' => bcrypt('password'),
        ]);
        
        $user->assignRole(['superadmin']);
        
        // User::factory(10)->create()->each(function ($user) {
        //     $randomRole = fake()->randomElements(['admin', 'guru', 'orangtua', 'walikelas'], 2);
        //     $user->syncRoles($randomRole);
        // });
    }
}
