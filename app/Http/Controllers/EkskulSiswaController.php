<?php

namespace App\Http\Controllers;

use App\Models\EkskulSiswa;
use Illuminate\Http\Request;

class EkskulSiswaController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        //
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
    public function show(EkskulSiswa $ekskulSiswa)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(EkskulSiswa $ekskulSiswa)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, EkskulSiswa $ekskulSiswa)
    {
        $data = $request->validate([
            'kegiatan' => 'nullable|string',
        ]);
        $ekskulSiswa->update($data);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(EkskulSiswa $ekskulSiswa)
    {
        //
    }
}
