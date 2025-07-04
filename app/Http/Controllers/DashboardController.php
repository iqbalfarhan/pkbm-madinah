<?php

namespace App\Http\Controllers;

use App\Models\Guru;
use App\Models\Kelas;
use App\Models\Siswa;
use App\Models\Tahunajaran;
use Illuminate\Http\Request;
use Inertia\Inertia;

class DashboardController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index() {
        $role = auth()->user()->role;
        
        if ($role === 'admin') {
            return Inertia::render('dashboard/index', [
                'siswa_count' => Siswa::where('status', 'aktif')->count(),
                'all_siswa_count' => Siswa::count(),
                'ppdb_count' => Siswa::where('status', 'ppdb')->count(),
                'guru_count' => Guru::count(),
                'walikelas_count' => Kelas::whereNotNull('guru_id')->count(),
                'kelas_count' => Kelas::count(),
                'tahun_ajaran' => Tahunajaran::whereActive(true)->first(),

            ]);
        }
        elseif ($role === 'guru') {
            return Inertia::render('dashboard/guru');
        }
        elseif ($role === 'orangtua') {
            return Inertia::render('dashboard/orang-tua', [
                'siswas' => Siswa::where('user_id', auth()->user()->id)->get(),
            ]);
        }

        return redirect()->route('logout');
    }

    public function dokumentasi() {
        return Inertia::render('dashboard/dokumentasi');
    }
}
