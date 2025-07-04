<?php

namespace App\Http\Controllers;

use App\Http\Requests\StoreTingkatRequest;
use App\Http\Requests\UpdateTingkatRequest;
use App\Models\Tingkat;
use Inertia\Inertia;

class TingkatController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        return Inertia::render('tingkat/index', [
            'tingkats' => Tingkat::with('kelases')->get()
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
    public function store(StoreTingkatRequest $request)
    {
        Tingkat::create($request->validated());
    }

    /**
     * Display the specified resource.
     */
    public function show(Tingkat $tingkat)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Tingkat $tingkat)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(UpdateTingkatRequest $request, Tingkat $tingkat)
    {
        $tingkat->update($request->validated());
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Tingkat $tingkat)
    {
        $tingkat->delete();
    }
}
