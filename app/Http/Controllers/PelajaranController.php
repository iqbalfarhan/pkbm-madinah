<?php

namespace App\Http\Controllers;

use App\Http\Requests\StorePelajaranRequest;
use App\Http\Requests\UpdatePelajaranRequest;
use App\Http\Resources\PelajaranResource;
use App\Models\Kelas;
use App\Models\Pelajaran;
use App\Models\Tahunajaran;
use Inertia\Inertia;

class PelajaranController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $kelas_ids = Kelas::sekarang()->get()->pluck('id');
        return Inertia::render('pelajaran/index', [
            'pelajarans' => PelajaranResource::collection(Pelajaran::whereIn('kelas_id', $kelas_ids)->get()),
        ]);
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
    public function store(StorePelajaranRequest $request)
    {
        
    }

    /**
     * Display the specified resource.
     */
    public function show(Pelajaran $pelajaran)
    {
        return Inertia::render('pelajaran/detail', [
            'pelajaran' => $pelajaran->load('mapel', 'kelas'),
        ]);
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Pelajaran $pelajaran)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(UpdatePelajaranRequest $request, Pelajaran $pelajaran)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Pelajaran $pelajaran)
    {
        //
    }
}
