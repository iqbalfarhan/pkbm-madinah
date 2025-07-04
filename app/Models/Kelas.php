<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Kelas extends Model
{
    /** @use HasFactory<\Database\Factories\KelasFactory> */
    use HasFactory;

    protected $fillable = [
        'name',
        'tingkat_id',
        'guru_id',
    ];

    public function tingkat()
    {
        return $this->belongsTo(Tingkat::class);
    }

    public function walikelas()
    {
        return $this->belongsTo(Guru::class, 'guru_id');
    }

    public function siswas()
    {
        return $this->hasMany(Siswa::class)->whereStatus('aktif');
    }

    public function mapels()
    {
        return $this->belongsToMany(Mapel::class);
    }
}
