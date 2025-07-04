<?php

namespace App\Observers;

use App\Models\Tahunajaran;
use Illuminate\Support\Str;

class TahunajaranObserver
{
    /**
     * Handle the Tahunajaran "creating" event.
     */
    public function creating(Tahunajaran $tahunajaran): void
    {
        $title = implode(' ', [
            $tahunajaran->name,
            $tahunajaran->semester,
        ]);

        $tahunajaran->slug = Str::slug($title);
    }

    /**
     * Handle the Tahunajaran "created" event.
     */
    public function created(Tahunajaran $tahunajaran): void
    {
        
    }

    /**
     * Handle the Tahunajaran "updated" event.
     */
    public function updated(Tahunajaran $tahunajaran): void
    {
        //
    }

    /**
     * Handle the Tahunajaran "deleted" event.
     */
    public function deleted(Tahunajaran $tahunajaran): void
    {
        //
    }

    /**
     * Handle the Tahunajaran "restored" event.
     */
    public function restored(Tahunajaran $tahunajaran): void
    {
        //
    }

    /**
     * Handle the Tahunajaran "force deleted" event.
     */
    public function forceDeleted(Tahunajaran $tahunajaran): void
    {
        //
    }
}
