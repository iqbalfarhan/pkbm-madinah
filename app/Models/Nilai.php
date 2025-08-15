<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Nilai extends Model
{
    /** @use HasFactory<\Database\Factories\NilaiFactory> */
    use HasFactory;

    protected $fillable = [
        'pelajaran_id',
        'siswa_id',
        'nilai_tugas',
        'nilai_evaluasi',
    ];

    public function pelajaran()
    {
        return $this->belongsTo(Pelajaran::class);
    }

    public function siswa()
    {
        return $this->belongsTo(Siswa::class);
    }
}
