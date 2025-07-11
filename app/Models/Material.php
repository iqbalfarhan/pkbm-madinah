<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Material extends Model
{
    /** @use HasFactory<\Database\Factories\MaterialFactory> */
    use HasFactory;

    protected $fillable = [
        'mapel_id',
        'title',
        'description',
        'url',
    ];

    public function mapel()
    {
        return $this->belongsTo(mapel::class);
    }
}
