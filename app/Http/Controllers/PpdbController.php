<?php

namespace App\Http\Controllers;

use App\Models\Siswa;
use Illuminate\Http\Request;
use Inertia\Inertia;

class PpdbController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        return Inertia::render('ppdb/index', [
            'siswas' => Siswa::orderBy('created_at')->ppdb()->get()
        ]);
    }

    /**
     * Display a listing of the resource.
     */
    public function setting()
    {
        return Inertia::render('ppdb/pengaturan');
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        //
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        //
    }

    /**
     * Display the specified resource.
     */
    public function show(Siswa $ppdb)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Siswa $ppdb)
    {
        return Inertia::render('ppdb/edit', [
            'siswa' => $ppdb
        ]);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, Siswa $ppdb)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Siswa $ppdb)
    {
        //
    }
}
