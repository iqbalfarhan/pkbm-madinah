<?php

namespace App\Providers;

use App\Models\Tahunajaran;
use App\Observers\TahunajaranObserver;
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
        Tahunajaran::observe(TahunajaranObserver::class);
    }
}
