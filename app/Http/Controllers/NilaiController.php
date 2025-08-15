<?php

namespace App\Http\Controllers;

use App\Http\Requests\StoreNilaiRequest;
use App\Http\Requests\UpdateNilaiRequest;
use App\Models\Nilai;

class NilaiController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        //
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(StoreNilaiRequest $request)
    {
        $data = $request->validated();
        Nilai::updateOrCreate([
            'pelajaran_id' => $data['pelajaran_id'],
            'siswa_id' => $data['siswa_id']
        ], $data);
    }

    /**
     * Display the specified resource.
     */
    public function show(Nilai $nilai)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(UpdateNilaiRequest $request, Nilai $nilai)
    {
        $data = $request->validated();
        $nilai->update($data);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Nilai $nilai)
    {
        $nilai->delete();
    }
}
