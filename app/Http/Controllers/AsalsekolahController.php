<?php

namespace App\Http\Controllers;

use App\Http\Requests\StoreAsalsekolahRequest;
use App\Http\Requests\UpdateAsalsekolahRequest;
use App\Models\Asalsekolah;

class AsalsekolahController extends Controller
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
    public function store(StoreAsalsekolahRequest $request)
    {
        Asalsekolah::create($request->validated());
    }

    /**
     * Display the specified resource.
     */
    public function show(Asalsekolah $asalsekolah)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Asalsekolah $asalsekolah)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(UpdateAsalsekolahRequest $request, Asalsekolah $asalsekolah)
    {
        $asalsekolah->update($request->validated());
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Asalsekolah $asalsekolah)
    {
        $asalsekolah->delete();
    }
}
