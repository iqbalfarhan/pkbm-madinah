<?php

namespace App\Http\Controllers;

use App\Http\Requests\StoreEkskulRequest;
use App\Http\Requests\UpdateEkskulRequest;
use App\Models\Ekskul;
use App\Models\Guru;
use Inertia\Inertia;

class EkskulController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        // return Ekskul::with('siswas', 'guru')->get();
        return Inertia::render('ekskul/index', [
            'ekskuls' => Ekskul::with('siswas', 'guru')->get(),
            'gurus' => Guru::get()
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
    public function store(StoreEkskulRequest $request)
    {
        Ekskul::create($request->validated());
    }

    /**
     * Display the specified resource.
     */
    public function show(Ekskul $ekskul)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Ekskul $ekskul)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(UpdateEkskulRequest $request, Ekskul $ekskul)
    {
        $ekskul->update($request->validated());
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Ekskul $ekskul)
    {
        $ekskul->delete();
    }
}
