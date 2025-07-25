<?php

namespace App\Models;

use App\Policies\KelasPolicy;
use Illuminate\Database\Eloquent\Attributes\UsePolicy;
use App\Observers\KelasObserver;
use Illuminate\Database\Eloquent\Attributes\ObservedBy;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Arr;

#[UsePolicy(KelasPolicy::class)]
#[ObservedBy(KelasObserver::class)]
class Kelas extends Model
{
    /** @use HasFactory<\Database\Factories\KelasFactory> */
    use HasFactory;

    protected $fillable = [
        'name',
        'tingkat_id',
        'tahunajaran_id',
        'guru_id',
    ];

    public $appends = [
        'description'
    ];

    public function tingkat()
    {
        return $this->belongsTo(Tingkat::class);
    }

    public function tahunajaran()
    {
        return $this->belongsTo(Tahunajaran::class);
    }

    public function walikelas()
    {
        return $this->belongsTo(Guru::class, 'guru_id');
    }

    public function siswas()
    {
        return $this->hasMany(Siswa::class)->aktif();
    }

    public function mapels()
    {
        return $this->belongsToMany(Mapel::class);
    }

    public function pelajarans()
    {
        return $this->hasMany(Pelajaran::class);
    }

    public function getDescriptionAttribute(): string
    {
        $siswaCount = $this->siswas()->count() ?? 0;
        $siswaDesc = $siswaCount > 0
            ? "memiliki {$siswaCount} siswa aktif"
            : "tidak memiliki siswa";

        $walikelasDesc = $this->walikelas
            ? "walikelas : {$this->walikelas->name}"
            : "belum memiliki walikelas";

        return implode(' ', [
            "Tingkat {$this->tingkat->label}",
            $siswaDesc,
            $walikelasDesc
        ]);
    }

    public function scopeSekarang($q)
    {
        $tahunajaranId = Tahunajaran::where('active', true)->first()?->id;
        return $q->where('tahunajaran_id', $tahunajaranId);
    }
}
