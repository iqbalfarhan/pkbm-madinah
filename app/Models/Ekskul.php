<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Ekskul extends Model
{
    /** @use HasFactory<\Database\Factories\EkskulFactory> */
    use HasFactory;

    protected $fillable = ['name', 'guru_id'];

    public function siswas()
    {
        return $this->belongsToMany(Siswa::class)->where('status', 'aktif')->withPivot(['kegiatan']);
    }

    public function guru()
    {
        return $this->belongsTo(Guru::class);
    }
}
