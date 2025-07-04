<?php

namespace App\Models;

use App\Casts\GenderCast;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Facades\Storage;

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
        return $this->hasOne(Kelas::class, 'guru_id');
    }

    public function getAvatarAttribute()
    {
        // return $this->photo ? Storage::url( $this->photo) : asset('user_placeholder.jpg');
        return $this->photo ? Storage::url( $this->photo) : "https://api.dicebear.com/9.x/dylan/png?seed={$this->name}";
    }
}
