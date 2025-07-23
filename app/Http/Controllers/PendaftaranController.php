<?php

namespace App\Http\Controllers;

use App\Http\Requests\StoreSiswaRequest;
use App\Models\Siswa;
use Illuminate\Http\Request;
use Inertia\Inertia;

class PendaftaranController extends Controller
{
    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        return Inertia::render('ppdb/tabs/datadiri-tab');
    }

    public function alamat()
    {
        return Inertia::render('ppdb/tabs/alamat-tab');
    }

    public function orangtua()
    {
        return Inertia::render('ppdb/tabs/orangtua-tab');
    }
    
    public function sekolah()
    {
        return Inertia::render('ppdb/tabs/sekolah-tab');
    }

    public function berkas()
    {
        return Inertia::render('ppdb/tabs/berkas-tab');
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(StoreSiswaRequest $request)
    {
        $siswa = Siswa::create($request->validated());
        return redirect()->route('ppdb.show', $siswa->id);
    }
}
