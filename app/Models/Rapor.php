<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Str;

class Rapor extends Model
{
    /** @use HasFactory<\Database\Factories\RaporFactory> */
    use HasFactory;

    protected $fillable = [
        'siswa_id',
        'tahunajaran_id',
        'jenis',
        'data',
        'pdf_path',
        'publish'
    ];

    protected $hidden = [
        'data'
    ];

    protected $casts = [
        'data' => 'array',
        'publish' => 'boolean'
    ];

    public static $jenis = [
        'perkembangan',
        'mapel umum',
        'tahsin',
        'tahfidz'
    ];

    public function siswa()
    {
        return $this->belongsTo(Siswa::class);
    }

    public function tahunajaran()
    {
        return $this->belongsTo(Tahunajaran::class);
    }

    public function scopePerkembangan($query)
    {
        return $query->where('jenis', 'perkembangan');
    }

    public function scopePublished($query)
    {
        return $query->wherePublish(true);
    }

    public function scopeTahsin($query)
    {
        return $query->where('jenis', 'tahsin');
    }

    public function getDownloadFileNameAttribute()
    {
        $downloadfilename = implode(' ', [
            'Rapor',
            $this->jenis,
            $this->siswa->name,
            $this->tahunajaran->label,
        ]);

        return Str::slug($downloadfilename).'.pdf';
    }

}
