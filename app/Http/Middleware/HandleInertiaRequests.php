<?php

namespace App\Http\Middleware;

use App\Http\Resources\UserResource;
use App\Models\Kelas;
use App\Models\Setting;
use App\Models\Tahunajaran;
use Illuminate\Foundation\Inspiring;
use Illuminate\Http\Request;
use Inertia\Middleware;
use Spatie\Permission\Models\Permission;
use Tighten\Ziggy\Ziggy;

class HandleInertiaRequests extends Middleware
{
    /**
     * The root template that's loaded on the first page visit.
     *
     * @see https://inertiajs.com/server-side-setup#root-template
     *
     * @var string
     */
    protected $rootView = 'app';

    /**
     * Determines the current asset version.
     *
     * @see https://inertiajs.com/asset-versioning
     */
    public function version(Request $request): ?string
    {
        return parent::version($request);
    }

    /**
     * Define the props that are shared by default.
     *
     * @see https://inertiajs.com/shared-data
     *
     * @return array<string, mixed>
     */
    public function share(Request $request): array
    {
        $user = $request->user();

        $permissions = collect(); // fallback kosong

        if ($user?->hasRole('superadmin')) {
            $permissions = Permission::pluck('name');
        } elseif ($user) {
            $permissions = $user->getAllPermissions()->unique()->pluck('name')->toArray();
        }

        // dd($user?->getRoleNames(), $user->guru->id, $user?->hasRole('walikelas') ? Kelas::where('guru_id',$user->guru->id)->first() : null);

        return [
            ...parent::share($request),
            'name' => config('app.name'),
            'active_ta' => Tahunajaran::whereActive(true)->first(),
            'tas' => Tahunajaran::latest()->get(),
            'auth' => [
                'user' => $user ? new UserResource($request->user()) : null,
                'roles' => $user?->getRoleNames(),
                'permissions' => $permissions,
                'kelas' => $user?->hasRole('walikelas') ? Kelas::where('guru_id',$user->guru->id)->get() : null,
            ],
            'settings' => Setting::pluck('value', 'key'),
            'ppdb_open' => Setting::where('key', 'PPDB_OPEN')->first()->value,
            'ziggy' => fn (): array => [
                ...(new Ziggy)->toArray(),
                'location' => $request->url(),
            ],
            'sidebarOpen' => ! $request->hasCookie('sidebar_state') || $request->cookie('sidebar_state') === 'true',
        ];
    }
}
