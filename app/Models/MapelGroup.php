<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class MapelGroup extends Model
{
    /** @use HasFactory<\Database\Factories\MapelGroupFactory> */
    use HasFactory;

    protected $fillable = [
        'name'
    ];

    public static $defaultMapelGroup = [
        'Matapelajaran umum',
        'Muatan lokal',
    ];

    public function mapels()
    {
        return $this->hasMany(Mapel::class);
    }
}
