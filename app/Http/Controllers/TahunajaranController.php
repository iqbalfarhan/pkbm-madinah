<?php

namespace App\Http\Controllers;

use App\Http\Requests\StoreTahunajaranRequest;
use App\Http\Requests\UpdateTahunajaranRequest;
use App\Models\Tahunajaran;
use Illuminate\Database\QueryException;
use Illuminate\Validation\ValidationException;
use Inertia\Inertia;

class TahunajaranController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        return Inertia::render('tahunajaran/index', [
            'active' => Tahunajaran::whereActive(true)->first() ?? null,
            'tahunajarans' => Tahunajaran::orderByDesc('name')->get(),
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
    public function store(StoreTahunajaranRequest $request)
    {
        Tahunajaran::create($request->validated());
    }

    /**
     * Display the specified resource.
     */
    public function show(Tahunajaran $tahunajaran)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Tahunajaran $tahunajaran)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(UpdateTahunajaranRequest $request, Tahunajaran $tahunajaran)
    {
        $data = $request->validated();

        // Kalau request minta active = 1
        if ($request->has('active') && $request->input('active')) {
            // Nonaktifkan semua tahun ajaran lain
            Tahunajaran::where('id', '!=', $tahunajaran->id)->update(['active' => 0]);

            // Pastikan data yang dikirim juga aktif
            $data['active'] = true;
        } else {
            // Kalau gak di-set aktif, pastiin gak ngubah status aktifnya
            unset($data['active']);
        }

        $tahunajaran->update($data);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Tahunajaran $tahunajaran)
    {
        $tahunajaran->delete();
    }
}
