<?php

namespace App\Http\Controllers;

use App\Http\Requests\StoreMapelRequest;
use App\Http\Requests\UpdateMapelRequest;
use App\Models\Guru;
use App\Models\Mapel;
use App\Models\MapelGroup;
use App\Models\Tingkat;
use Inertia\Inertia;

class MapelController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $data = Mapel::with(['guru', 'mapelGroup', 'tingkat'])->get();
        return Inertia::render('mapel/index', [
            'mapels' => $data,
            'mapelGroups' => MapelGroup::get(),
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
    public function store(StoreMapelRequest $request)
    {
        Mapel::create($request->validated());
    }

    /**
     * Display the specified resource.
     */
    public function show(Mapel $mapel)
    {
        return Inertia::render('mapel/show', [
            'mapel' => $mapel->load(['guru', 'mapelGroup', 'tingkat', 'materials']),
            'mapelGroups' => MapelGroup::get(),
            'tingkats' => Tingkat::get(),
            'gurus' => Guru::get(),
        ]);
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Mapel $mapel)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(UpdateMapelRequest $request, Mapel $mapel)
    {
        $mapel->update($request->validated());
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Mapel $mapel)
    {
        $mapel->delete();
    }
}
