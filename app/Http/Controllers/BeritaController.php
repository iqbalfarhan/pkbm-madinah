<?php

namespace App\Http\Controllers;

use App\Http\Requests\StoreBeritaRequest;
use App\Http\Requests\UpdateBeritaRequest;
use App\Models\Berita;
use Inertia\Inertia;

class BeritaController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        return Inertia::render('berita/index', [
            'beritas' => Berita::with('user', 'media')->get(),
        ]);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(StoreBeritaRequest $request)
    {
        $data = $request->validated();
        Berita::create($data);
    }

    /**
     * Display the specified resource.
     */
    public function show(Berita $beritum)
    {
        return Inertia::render('berita/show', [
            'berita' => $beritum
        ]);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(UpdateBeritaRequest $request, Berita $beritum)
    {
        $data = $request->validated();
        $beritum->update($data);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Berita $beritum)
    {
        $beritum->delete();
    }
}
