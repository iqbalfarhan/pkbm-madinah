<?php

namespace App\Http\Controllers;

use App\Http\Requests\StoreRaporRequest;
use App\Http\Requests\UpdateRaporRequest;
use App\Models\Rapor;
use App\Models\Siswa;
use App\Models\Tahunajaran;
use Inertia\Inertia;
use Barryvdh\DomPDF\Facade\Pdf;

class RaporController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        return Inertia::render('rapor/index', [
            'rapors' => Rapor::with(['siswa', 'tahunajaran', 'siswa.kelas'])->perkembangan()->get(),
            'siswas' => Siswa::orderBy('name')->with('kelas')->get(),
            'tahunajarans' => Tahunajaran::get(),
            'jenisrapors' => Rapor::$jenis,
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
        //
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Rapor $rapor)
    {
        return Inertia::render("rapor/perkembangan-form", [
            'rapor' => $rapor->load('siswa', 'tahunajaran', 'siswa.kelas'),
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
        // $html = '<pre>'.json_encode($rapor->siswa->toArray(), JSON_PRETTY_PRINT).'</pre>';
        return Pdf::setOption(['defaultFont' => 'consolas'])->loadView('template.rapor-perkembangan', [
            'rapor' => $rapor->load('siswa', 'tahunajaran', 'siswa.kelas'),
        ])->stream();
    }
}
