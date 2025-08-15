<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Material extends Model
{
    /** @use HasFactory<\Database\Factories\MaterialFactory> */
    use HasFactory;

    protected $fillable = [
        'pelajaran_id',
        'title',
        'description',
        'url',
    ];

    public function pelajaran()
    {
        return $this->belongsTo(Pelajaran::class);
    }
}
