<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Str;
use Spatie\MediaLibrary\HasMedia;
use Spatie\MediaLibrary\InteractsWithMedia;

class Pembayaran extends Model implements HasMedia
{
    /** @use HasFactory<\Database\Factories\PembayaranFactory> */
    use HasFactory, InteractsWithMedia;

    protected $fillable = [
        'siswa_id',
        'keterangan',
        'nominal',
        'paid',
        'paid_at',
    ];

    public $appends = [
        'code',
    ];

    public function siswa()
    {
        return $this->belongsTo(Siswa::class);
    }

    public function setPaidAttribute($value)
    {
        $this->attributes['paid'] = $value;

        if ($value) {
            $this->attributes['paid_at'] = now();
        }
        else {
            $this->attributes['paid_at'] = null;
        }
    }

    public function getCodeAttribute()
    {
        return Str::padLeft($this->id, 6, '0');
    }
}
