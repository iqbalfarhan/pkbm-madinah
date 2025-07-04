<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Facades\Storage;

class Mapel extends Model
{
    /** @use HasFactory<\Database\Factories\MapelFactory> */
    use HasFactory;

    protected $fillable = [
        'name',
        'description',
        'photo',
        'tingkat_id',
        'guru_id',
        'mapel_group_id',
    ];

    public $appends = [
        'thumbnail'
    ];

    public function tingkat()
    {
        return $this->belongsTo(Tingkat::class);
    }

    public function guru()
    {
        return $this->belongsTo(Guru::class);
    }

    public function materials()
    {
        return $this->hasMany(Material::class);
    }

    public function mapelGroup()
    {
        return $this->belongsTo(MapelGroup::class);
    }

    public function getThumbnailAttribute()
    {
        return $this->photo ? Storage::url($this->photo) : asset('user_placeholder.jpg');
    }

    public function kelas()
    {
        return $this->belongsToMany(Kelas::class);
    }
}
