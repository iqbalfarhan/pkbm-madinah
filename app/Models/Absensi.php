<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Absensi extends Model
{
    /** @use HasFactory<\Database\Factories\AbsensiFactory> */
    use HasFactory;

    protected $fillable = [
        'tahunajaran_id',
        'kelas_id',
        'siswa_id',
        'guru_id',
        'mapel_id',
        'tanggal',
        'status',
    ];

    public function tahunajaran()
    {
        return $this->belongsTo(Tahunajaran::class);
    }

    public function kelas()
    {
        return $this->belongsTo(Kelas::class);
    }

    public function siswa()
    {
        return $this->belongsTo(Siswa::class);
    }

    public function guru()
    {
        return $this->belongsTo(Guru::class);
    }
    
    public function mapel()
    {
        return $this->belongsTo(Mapel::class);
    }
}
