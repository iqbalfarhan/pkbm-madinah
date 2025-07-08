<?php

namespace App\Http\Controllers;

use App\Http\Requests\StoreKelasRequest;
use App\Http\Requests\UpdateKelasRequest;
use App\Http\Resources\KelasResource;
use App\Http\Resources\KetidakhadiranResource;
use App\Models\Guru;
use App\Models\Kelas;
use App\Models\Ketidakhadiran;
use App\Models\Tahunajaran;
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
            'kelas' => new KelasResource($kela),
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

    public function ketidakhadiran(Kelas $kela)
    {
        $siswa_ids = $kela->siswas->pluck('id');
        $ta = Tahunajaran::where('active', true)->first()?->id;

        $ketidakhadirans = Ketidakhadiran::when($ta, function($q) use ($ta) {
            return $q->where('tahunajaran_id', $ta);
        })->whereIn('siswa_id', $siswa_ids)->get();

        return Inertia::render('kelas/tabs/ketidakhadiran', [
            'kelas' => new KelasResource($kela),
            'ketidakhadirans' => KetidakhadiranResource::collection($ketidakhadirans),
            'tingkats' => Tingkat::get(),
        ]);
    }

    public function pelajaran(Kelas $kela)
    {
        return Inertia::render('kelas/tabs/pelajaran', [
            'kelas' => new KelasResource($kela),
            'tingkats' => Tingkat::get(),
        ]);
    }

    public function ekskul(Kelas $kela)
    {
        return Inertia::render('kelas/tabs/ekskul', [
            'kelas' => new KelasResource($kela),
            'tingkats' => Tingkat::get(),
        ]);
    }

    public function rapor(Kelas $kela)
    {
        return Inertia::render('kelas/tabs/rapor', [
            'kelas' => new KelasResource($kela),
            'tingkats' => Tingkat::get(),
        ]);
    }
}
