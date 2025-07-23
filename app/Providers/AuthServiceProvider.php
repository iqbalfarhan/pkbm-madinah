<?php

namespace App\Providers;

use App\Models\Siswa;
use App\Policies\SiswaPolicy;
use Illuminate\Support\Facades\Gate;
use Illuminate\Support\ServiceProvider;

class AuthServiceProvider extends ServiceProvider
{

    protected $policies = [
        Siswa::class => SiswaPolicy::class,
        Kelas::class => KelasPolicy::class,
    ];
    /**
     * Register services.
     */
    public function register(): void
    {
        
    }

    /**
     * Bootstrap services.
     */
    public function boot(): void
    {
        Gate::before(function ($user, $ability) {
            return $user->hasRole('superadmin') ? true : null;
        });
    }
}
