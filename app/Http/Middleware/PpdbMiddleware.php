<?php

namespace App\Http\Middleware;

use App\Models\Setting;
use Closure;
use Illuminate\Http\Request;
use Symfony\Component\HttpFoundation\Response;

class PpdbMiddleware
{
    /**
     * Handle an incoming request.
     *
     * @param  \Closure(\Illuminate\Http\Request): (\Symfony\Component\HttpFoundation\Response)  $next
     */
    public function handle(Request $request, Closure $next): Response
    {
        $user = $request->user();
    
        $ppdb_open = Setting::where('key', 'PPDB_OPEN')->first();

        if (($ppdb_open && $ppdb_open->value === "false") && !$user?->can('mengatur ppdb')) {
            abort(403, 'Sesi Penerimaan peserta didik baru sedang ditutup');
        }

        return $next($request);
    }
}
