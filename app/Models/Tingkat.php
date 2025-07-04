<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Tingkat extends Model
{
    /** @use HasFactory<\Database\Factories\TingkatFactory> */
    use HasFactory;

    protected $fillable = [
        'group',
        'name',
    ];

    public $appends = [
        'label'
    ];

    public function getLabelAttribute()
    {
        return "{$this->group} - {$this->name}";
    }

    public function mapels()
    {
        return $this->hasMany(Mapel::class);
    }

    public function kelases()
    {
        return $this->hasMany(Kelas::class, 'tingkat_id');
    }
}
