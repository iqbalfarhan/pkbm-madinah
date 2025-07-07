<?php

namespace App\Observers;

use App\Models\Guru;
use App\Models\User;

class GuruObserver
{
    /**
     * Handle the Guru "created" event.
     */
    public function created(Guru $guru): void
    {
        $user = User::create([
            'name' => $guru->name,
            'email' => $guru->email,
            'password' => 'password',
        ]);

        $user->assignRole('guru');

        $guru->update(['user_id' => $user->id]);
    }

    /**
     * Handle the Guru "updated" event.
     */
    public function updated(Guru $guru): void
    {
        $user = $guru->user;
        $user->update([
            'name' => $guru->name,
            'email' => $guru->email,
            'photo' => $guru->photo,
        ]);

        if ($guru->kelas) {
            $guru->user->assignRole('walikelas');
        }
        else{
            $guru->user->removeRole('walikelas');
        }
    }

    /**
     * Handle the Guru "deleted" event.
     */
    public function deleted(Guru $guru): void
    {
        $guru->user?->forceDelete();
    }

    /**
     * Handle the Guru "restored" event.
     */
    public function restored(Guru $guru): void
    {
        //
    }

    /**
     * Handle the Guru "force deleted" event.
     */
    public function forceDeleted(Guru $guru): void
    {
        //
    }
}
