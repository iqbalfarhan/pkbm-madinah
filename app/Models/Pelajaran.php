<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Pelajaran extends Model
{
    /** @use HasFactory<\Database\Factories\PelajaranFactory> */
    use HasFactory;

    protected $fillable = [
        'mapel_id',
        'kelas_id',
        'guru_id',
    ];

    public function kelas()
    {
        return $this->belongsTo(Kelas::class);
    }

    public function guru()
    {
        return $this->belongsTo(Guru::class);
    }

    public function tahunajaran()
    {
        return $this->hasOneThrough(
            Tahunajaran::class, // model tujuan
            Kelas::class,       // model perantara
            'id',               // FK di tabel kelas → ke siswa (kelas.id)
            'id',               // FK di tabel tahunajaran → ke kelas (tahunajaran.id)
            'kelas_id',         // FK di tabel siswa
            'tahunajaran_id'    // FK di tabel kelas
        );
    }

    public function mapel()
    {
        return $this->belongsTo(Mapel::class);
    }

    public function materials()
    {
        return $this->hasMany(Material::class);
    }
}
