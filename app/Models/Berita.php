<?php

namespace App\Models;

use App\Observers\BeritaObserver;
use Illuminate\Database\Eloquent\Attributes\ObservedBy;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Spatie\Image\Enums\Fit;
use Spatie\MediaLibrary\HasMedia;
use Spatie\MediaLibrary\InteractsWithMedia;
use Spatie\MediaLibrary\MediaCollections\Models\Media;

#[ObservedBy(BeritaObserver::class)]
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

    public $appends = ['thumbnail', 'meta'];

    public function user()
    {
        return $this->belongsTo(User::class);
    }

    public function getThumbnailAttribute()
    {
        $url = $this->getFirstMediaUrl('*');
        return  $url ?: asset('image_placeholder.png');
    }

    public function registerMediaConversions(?Media $media = null): void
    {
        $this
            ->addMediaConversion('preview')
            ->fit(Fit::Contain, 300, 300)
            ->nonQueued();
    }

    public function getMetaAttribute()
    {
        return implode(' ', [
            'Berita ini ditulis oleh',
            $this->user->name,
            'pada',
            $this->created_at->format('d F Y'),
        ]);
    }
}
