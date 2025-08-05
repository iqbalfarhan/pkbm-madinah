<?php

namespace App\Http\Controllers;

use App\Http\Requests\PpdbSettingSettingRequest;
use App\Http\Requests\StoreSiswaRequest;
use App\Http\Resources\SiswaResource;
use App\Models\Setting;
use App\Models\Siswa;
use App\Models\Tahunajaran;
use Illuminate\Http\Request;
use Inertia\Inertia;

class PpdbController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $data = Siswa::orderBy('created_at')->ppdb()->get();

        return Inertia::render('ppdb/index', [
            'siswas' => SiswaResource::collection($data),
            'tahunajarans' => Tahunajaran::orderBy('name')->get(),
        ]);
    }

    /**
     * Display a listing of the resource.
     */
    public function create()
    {
        return redirect()->route('pendaftaran.create');
    }

    /**
     * Display a listing of the resource.
     */
    public function setting(PpdbSettingSettingRequest $request)
    {
        $data = $request->validated();

        Setting::where('key', 'PPDB_OPEN')->update([
            'value' => $data['PPDB_OPEN']
        ]);

        Setting::where('key', 'PPDB_TAHUNAJARAN_ID')->update([
            'value' => $data['PPDB_TAHUNAJARAN_ID']
        ]);
    }

    /**
     * Display the specified resource.
     */
    public function show(Siswa $ppdb)
    {
        if ($ppdb->status !== 'ppdb') {
            abort(404);
        }

        return Inertia::render('ppdb/show', [
            'siswa' => new SiswaResource($ppdb),
            "medias" => $ppdb->getMedia('*'),
        ]);
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

    public function accept(Siswa $ppdb)
    {
        $ppdb->update([
            'status' => 'aktif'
        ]);
    }
}
