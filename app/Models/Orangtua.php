<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Orangtua extends Model
{
    /** @use HasFactory<\Database\Factories\OrangtuaFactory> */
    use HasFactory;

    protected $fillable = [
        'siswa_id',
        'father_name',
        'father_address',
        'father_phone',
        'father_ocupation',
        'mother_name',
        'mother_address',
        'mother_phone',
        'mother_ocupation',
    ];

    public function siswa()
    {
        return $this->belongsTo(Siswa::class);
    }
}
