<?php

namespace App\Http\Controllers;

use App\Models\Guru;
use App\Models\Kelas;
use App\Models\Siswa;
use App\Models\Tahunajaran;
use App\Models\Tingkat;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Inertia\Inertia;
use Spatie\Permission\Models\Permission;

class DashboardController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index() {
        $user = Auth::user();
        $roles = auth()->user()->getRoleNames()->toArray();
        
        if ($user->hasRole('admin') || $user->hasRole('superadmin')) {
            return Inertia::render('dashboard/admin', [
                'siswa_count' => Siswa::where('status', 'aktif')->count(),
                'all_siswa_count' => Siswa::count(),
                'ppdb_count' => Siswa::where('status', 'ppdb')->count(),
                'guru_count' => Guru::count(),
                'walikelas_count' => Kelas::whereNotNull('guru_id')->count(),
                'kelas_count' => Kelas::count(),
                'tahun_ajaran' => Tahunajaran::whereActive(true)->first(),
                'tingkats' => Tingkat::withCount('siswas')->get()
            ]);
        }
        elseif (in_array('guru', $roles)) {
            return Inertia::render('dashboard/guru');
        }
        elseif (in_array('orangtua', $roles)) {
            return Inertia::render('dashboard/orang-tua', [
                'siswas' => Siswa::where('user_id', auth()->user()->id)->get(),
            ]);
        }

        return Auth::logout();
    }

    public function dokumentasi() {
        return Inertia::render('dashboard/dokumentasi');
    }
}
