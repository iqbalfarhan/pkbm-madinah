<?php

namespace App\Observers;

use App\Models\Berita;
use Illuminate\Support\Str;

class BeritaObserver
{
    /**
     * Handle the Berita "created" event.
     */
    public function created(Berita $berita): void
    {
        $berita->slug = Str::slug($berita->judul);
        $berita->saveQuietly();
    }

    /**
     * Handle the Berita "updated" event.
     */
    public function updated(Berita $berita): void
    {
        //
    }

    /**
     * Handle the Berita "deleted" event.
     */
    public function deleted(Berita $berita): void
    {
        //
    }

    /**
     * Handle the Berita "restored" event.
     */
    public function restored(Berita $berita): void
    {
        //
    }

    /**
     * Handle the Berita "force deleted" event.
     */
    public function forceDeleted(Berita $berita): void
    {
        //
    }
}
