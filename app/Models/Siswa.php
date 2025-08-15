<?php

namespace App\Models;

use App\Casts\GenderCast;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;
use Illuminate\Support\Carbon;
use Illuminate\Support\Facades\Storage;
use Spatie\Image\Enums\Fit;
use Spatie\MediaLibrary\HasMedia;
use Spatie\MediaLibrary\InteractsWithMedia;
use Spatie\MediaLibrary\MediaCollections\Models\Media;

class Siswa extends Model implements HasMedia
{
    /** @use HasFactory<\Database\Factories\SiswaFactory> */
    use HasFactory, SoftDeletes, InteractsWithMedia;

    protected $fillable = [
        'name',
        'nisn',
        'nis',
        'user_id',
        'kelas_id',
        'gender',
        'pob',
        'dob',
        'religion',
        'address',
        'register_year',
        'phone',
        'email',
        'status',
        'active',
        'photo'
    ];

    protected $casts = [
        'gender' => GenderCast::class,
        'active' => 'boolean',
        'dob' => 'date:Y-m-d',
        'created_at' => 'date:d F Y - H:i:s',
    ];

    public $appends = ['ttl', 'avatar', 'umur', 'kelas_label'];

    public function registerMediaConversions(?Media $media = null): void
{
    $this
        ->addMediaConversion('preview')
        ->fit(Fit::Contain, 300, 300)
        ->nonQueued();
}

    public function user()
    {
        return $this->belongsTo(User::class);
    }

    public function kelas()
    {
        return $this->belongsTo(Kelas::class);
    }

    public function getKelasLabelAttribute()
    {
        return $this->kelas?->tingkat?->group . " - " . $this->kelas?->name;
    }

    public function orangtuas()
    {
        return $this->hasOne(Orangtua::class);
    }

    public function getTtlAttribute()
    {
        return implode(', ', [$this->pob, $this->dob?->format('d F Y')]);
    }

    public function getAvatarAttribute()
    {
        return $this->photo ?: asset('user_placeholder.png');
    }

    public function scopeAktif($query)
    {
        return $query->whereStatus('aktif');
    }

    public function scopePpdb($query)
    {
        return $query->whereStatus('ppdb');
    }

    public function scopeLulus($query)
    {
        return $query->whereStatus('lulus');
    }
    
    public function scopePindah($query)
    {
        return $query->whereStatus('pindah');
    }

    public function scopeDikeluarkan($query)
    {
        return $query->whereStatus('dikeluarkan');
    }

    public function ketidakhadirans()
    {
        return $this->hasMany(Ketidakhadiran::class);
    }

    public function getUmurAttribute(): string
    {
        $lahir = Carbon::parse($this->dob?->format('Y-m-d'));
        $sekarang = Carbon::now();

        if ($lahir->greaterThan($sekarang)) {
            return 'Belum lahir';
        }
    
        $diff = $lahir->diff($sekarang);
    
        $tahun = $diff->y;
        $bulan = $diff->m;
    
        return "{$tahun} tahun {$bulan} bulan";
    }

    public function ekskuls()
    {
        return $this->belongsToMany(Ekskul::class)->withPivot(['kegiatan']);
    }

    public function rapors()
    {
        return $this->hasMany(Rapor::class) ?? [];
    }

    public function orangtua()
    {
        return $this->hasOne(Orangtua::class);
    }

    public function asalsekolah()
    {
        return $this->hasOne(Asalsekolah::class);
    }

    public function nilais()
    {
        return $this->hasMany(Nilai::class);
    }
}
