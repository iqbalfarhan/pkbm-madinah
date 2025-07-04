<?php

namespace Database\Factories;

use App\Models\Kelas;
use App\Models\User;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Siswa>
 */
class SiswaFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        $tahunmasuk = fake()->randomElement([2022, 2023, 2024, 2025]);
        $gender = fake()->randomElement(['Laki-laki', 'Perempuan']);
        $jk = $gender == "Laki-laki" ? "male" : "female";
        $name = fake()->firstName($jk) ." ". fake()->lastName($jk);

        return [
            'name' => $name,
            'nisn' => $tahunmasuk.fake()->numerify('######'),
            'user_id' => User::pluck('id')->random(),
            'kelas_id' => fake()->randomElement([Kelas::pluck('id')->random(), null]),
            'gender' => $gender,
            'pob' => fake()->city(),
            'dob' => fake()->date(),
            'religion' => fake()->randomElement(['islam', 'kristen', 'katolik', 'hindu', 'budha']),
            'address' => fake()->address(),
            'phone' => fake()->e164PhoneNumber(),
            'register_year' => $tahunmasuk,
            'email' => fake()->unique()->safeEmail(),
            'status' => fake()->randomElement(['ppdb', 'aktif', 'lulus', 'pindah', 'dikeluarkan']),
            'active' => fake()->boolean(9),
        ];
    }
}
