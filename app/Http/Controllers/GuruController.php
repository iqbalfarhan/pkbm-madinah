<?php

namespace App\Http\Controllers;

use App\Http\Requests\StoreGuruRequest;
use App\Http\Requests\UpdateGuruRequest;
use App\Http\Resources\GuruResource;
use App\Models\Guru;
use App\Models\User;
use Inertia\Inertia;

class GuruController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {   
        return Inertia::render('guru/index', [
            'gurus' => Guru::with('user', 'walikelas')->orderBy('name')->get(),
        ]);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        return Inertia::render('guru/create');
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(StoreGuruRequest $request)
    {
        $data = $request->validated();

        if ($request->hasFile('photo')) {
            $data['photo'] = $request->file('photo')->store('guru');
        }

        Guru::create($data);
    }

    /**
     * Display the specified resource.
     */
    public function show(Guru $guru)
    {
        // return new GuruResource($guru);
        return Inertia::render('guru/show', [
            'guru' => new GuruResource($guru),
        ]);
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Guru $guru)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(UpdateGuruRequest $request, Guru $guru)
    {
        $data = $request->validated();
        // return $data;

        // if ($request->hasFile('photo')) {
        //     $data['photo'] = $request->file('photo')->store('guru');
        // }

        $guru->update($data);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Guru $guru)
    {
        $guru->delete();
    }
}
