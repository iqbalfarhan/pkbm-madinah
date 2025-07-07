<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Asalsekolah extends Model
{
    /** @use HasFactory<\Database\Factories\AsalsekolahFactory> */
    use HasFactory;

    protected $fillable = [
        'siswa_id',
        'name',
        'address',
    ];

    public function siswa()
    {
        return $this->belongsTo(Siswa::class);
    }
}
