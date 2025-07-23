<?php

namespace App\Models;

use App\Casts\GenderCast;
use App\Observers\GuruObserver;
use Illuminate\Database\Eloquent\Attributes\ObservedBy;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Facades\Storage;

#[ObservedBy(GuruObserver::class)]
class Guru extends Model
{
    /** @use HasFactory<\Database\Factories\GuruFactory> */
    use HasFactory;

    protected $fillable = [
        'name',
        'nip',
        'address',
        'phone',
        'email',
        'photo',
        'gender',
        'active',
        'user_id',
    ];

    protected $casts = [
        'gender' => GenderCast::class,
        'active' => 'boolean',
    ];

    public $appends = ['avatar'];

    public function user()
    {
        return $this->belongsTo(User::class);
    }

    public function walikelas(){
        return $this->hasMany(Kelas::class, 'guru_id');
    }

    public function getAvatarAttribute()
    {
        // return $this->photo ? Storage::url( $this->photo) : asset('user_placeholder.jpg');
        return $this->photo ? Storage::url( $this->photo) : "https://api.dicebear.com/9.x/dylan/png?seed={$this->name}";
    }

    public function ekskuls()
    {
        return $this->hasMany(Ekskul::class);
    }

    public function pelajarans()
    {
        return $this->hasMany(Pelajaran::class);
    }
}
