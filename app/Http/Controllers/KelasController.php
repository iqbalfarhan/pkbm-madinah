<?php

namespace App\Http\Controllers;

use App\Http\Requests\StoreKelasRequest;
use App\Http\Requests\UpdateKelasRequest;
use App\Models\Guru;
use App\Models\Kelas;
use App\Models\Tingkat;
use Inertia\Inertia;

class KelasController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        // dd(Kelas::with('tingkat', 'walikelas', 'siswas')->get()->toArray());
        return Inertia::render('kelas/index', [
            'kelass' => Kelas::with('tingkat', 'walikelas', 'siswas')->get(),
            'tingkats' => Tingkat::get(),
            'gurus' => Guru::get(),
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
    public function store(StoreKelasRequest $request)
    {
        Kelas::create($request->validated());
    }

    /**
     * Display the specified resource.
     */
    public function show(Kelas $kela)
    {
        return Inertia::render('kelas/show', [
            'kelas' => $kela->load('tingkat', 'walikelas', 'siswas'),
            'tingkats' => Tingkat::get(),
            'gurus' => Guru::get(),
        ]);
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Kelas $kela)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(UpdateKelasRequest $request, Kelas $kela)
    {
        $kela->update($request->validated());
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Kelas $kela)
    {
        $kela->delete();
    }
}
