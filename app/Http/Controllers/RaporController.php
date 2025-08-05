<?php

namespace App\Http\Controllers;

use App\Http\Requests\StoreRaporRequest;
use App\Http\Requests\UpdateRaporRequest;
use App\Http\Resources\RaporDataResource;
use App\Http\Resources\RaporResource;
use App\Models\Rapor;
use App\Models\Siswa;
use App\Models\Tahunajaran;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Barryvdh\DomPDF\Facade\Pdf;

class RaporController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index(Request $request)
    {
        $tahunajaran_id = $request->get('tahunajaran_id');
        $jenis = $request->get('jenis');

        $rapors = Rapor::with([
            'siswa' => fn ($q) => $q->withTrashed(),
            'siswa.kelas',
            'tahunajaran',
        ])
        ->when($jenis, fn ($q) => $q->where('jenis', $jenis))
        ->when($tahunajaran_id, fn ($q) => $q->where('tahunajaran_id', $tahunajaran_id))
        ->get();

        return Inertia::render('rapor/index', [
            'rapors' => $rapors,
            'siswas' => Siswa::orderBy('name')->with('kelas')->get(),
            'tahunajarans' => Tahunajaran::get(),
            'jenisrapors' => Rapor::$jenis,
            'query' => $request->all(),
        ]);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(StoreRaporRequest $request)
    {
        $rapor = Rapor::create($request->validated());
        return redirect()->route('rapor.edit', $rapor->id);
    }

    /**
     * Display the specified resource.
     */
    public function show(Rapor $rapor)
    {
        return Inertia::render('rapor/show', [
            'rapor' => new RaporDataResource($rapor),
        ]);
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Rapor $rapor)
    {
        return Inertia::render("rapor/perkembangan-form", [
            'rapor' => new RaporDataResource($rapor),
        ]);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(UpdateRaporRequest $request, Rapor $rapor)
    {
        $rapor->update($request->validated());
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Rapor $rapor)
    {
        $rapor->delete();
    }

    public function downloadPdf(Rapor $rapor)
    {
        // return $rapor->download_file_name;
        return Pdf::loadView('template.rapor-perkembangan', [
            'rapor' => $rapor->load('siswa', 'tahunajaran', 'siswa.kelas', 'siswa.ekskuls'),
        ])->download($rapor->download_file_name);
    }

    public function streamPdf(Rapor $rapor)
    {
        // return $rapor->download_file_name;
        return Pdf::loadView('template.rapor-perkembangan', [
            'rapor' => $rapor->load('siswa', 'tahunajaran', 'siswa.kelas', 'siswa.ekskuls'),
        ])->stream($rapor->download_file_name);
    }
}
