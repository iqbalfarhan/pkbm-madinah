<?php

namespace App\Http\Controllers;

use App\Http\Requests\StoreBeritaRequest;
use App\Http\Requests\StoreMediaBeritaRequest;
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
        $data['user_id'] = auth()->user()->id;
        
        Berita::create($data);
    }

    /**
     * Display the specified resource.
     */
    public function show(Berita $beritum)
    {
        return Inertia::render('berita/show', [
            'berita' => $beritum->load('user')
        ]);
    }

    public function edit(Berita $beritum)
    {
        return Inertia::render('berita/edit', [
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

    public function uploadMedia(StoreMediaBeritaRequest $request, Berita $berita)
    {
        $data = $request->validated();
        $berita->addMedia($data['file'])->toMediaLibrary();
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Berita $beritum)
    {
        $beritum->delete();
    }
}
