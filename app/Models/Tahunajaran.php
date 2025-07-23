<?php

namespace App\Models;

use App\Observers\TahunajaranObserver;
use Illuminate\Database\Eloquent\Attributes\ObservedBy;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

#[ObservedBy(TahunajaranObserver::class)]
class Tahunajaran extends Model
{
    /** @use HasFactory<\Database\Factories\TahunajaranFactory> */
    use HasFactory;

    protected $fillable = [
        'name',
        'semester',
        'active',
        'slug',
    ];

    protected $casts = [
        'active' => 'boolean',
    ];

    protected $hidden = [
        'created_at',
        'updated_at',
    ];

    public $appends = ['label'];

    public function getLabelAttribute()
    {
        return $this->name . ' - semester ' . $this->semester;
    }
}
