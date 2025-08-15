<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Spatie\MediaLibrary\HasMedia;
use Spatie\MediaLibrary\InteractsWithMedia;

class Berita extends Model implements HasMedia
{
    /** @use HasFactory<\Database\Factories\BeritaFactory> */
    use HasFactory, InteractsWithMedia;

    protected $fillable = [
        'user_id',
        'slug',
        'judul',
        'content',
    ];

    public $appends = ['thumbnail'];

    public function user()
    {
        return $this->belongsTo(User::class);
    }

    public function getThumbnailAttribute()
    {
        $url = $this->getFirstMediaUrl('thumbnail');
        return  $url ?: asset('image_placeholder.png');
    }
}
