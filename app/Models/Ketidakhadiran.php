<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Spatie\MediaLibrary\HasMedia;
use Spatie\MediaLibrary\InteractsWithMedia;

class Ketidakhadiran extends Model implements HasMedia
{
    /** @use HasFactory<\Database\Factories\KetidakhadiranFactory> */
    use HasFactory, InteractsWithMedia;

    protected $fillable = [
        'tahunajaran_id',
        'siswa_id',
        'date',
        'reason',
    ];

    protected $casts = [
        'date' => 'date:Y-m-d',
    ];

    public function siswa()
    {
        return $this->belongsTo(Siswa::class);
    }

    public function tahunajaran()
    {
        return $this->belongsTo(Tahunajaran::class);
    }
}
