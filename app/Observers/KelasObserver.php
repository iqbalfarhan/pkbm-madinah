<?php

namespace App\Observers;

use App\Models\Kelas;

class KelasObserver
{
    /**
     * Handle the Kelas "created" event.
     */
    public function created(Kelas $kelas): void
    {
        //
    }

    /**
     * Handle the Kelas "updated" event.
     */
    public function updated(Kelas $kelas): void
    {
        if ($kelas->walikelas) {
            $kelas->walikelas->user->assignRole('walikelas');
        }
    }

    /**
     * Handle the Kelas "deleted" event.
     */
    public function deleted(Kelas $kelas): void
    {
        //
    }

    /**
     * Handle the Kelas "restored" event.
     */
    public function restored(Kelas $kelas): void
    {
        //
    }

    /**
     * Handle the Kelas "force deleted" event.
     */
    public function forceDeleted(Kelas $kelas): void
    {
        //
    }
}
