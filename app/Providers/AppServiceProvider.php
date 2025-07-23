<?php

namespace App\Providers;

use App\Models\Kelas;
use App\Models\Tahunajaran;
use App\Observers\TahunajaranObserver;
use App\Policies\KelasPolicy;
use Illuminate\Http\Resources\Json\JsonResource;
use Illuminate\Support\Facades\Gate;
use Illuminate\Support\ServiceProvider;

class AppServiceProvider extends ServiceProvider
{
    /**
     * Register any application services.
     */
    public function register(): void
    {
        JsonResource::withoutWrapping();
    }

    /**
     * Bootstrap any application services.
     */
    public function boot(): void
    {
        Gate::policy(Kelas::class, KelasPolicy::class);
    }
}
