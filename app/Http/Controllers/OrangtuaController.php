<?php

namespace App\Http\Controllers;

use App\Http\Requests\StoreOrangtuaRequest;
use App\Http\Requests\UpdateOrangtuaRequest;
use App\Models\Orangtua;

class OrangtuaController extends Controller
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
    public function store(StoreOrangtuaRequest $request)
    {
        Orangtua::create($request->validated());
    }

    /**
     * Display the specified resource.
     */
    public function show(Orangtua $orangtua)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Orangtua $orangtua)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(UpdateOrangtuaRequest $request, Orangtua $orangtua)
    {
        $orangtua->update($request->validated());
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Orangtua $orangtua)
    {
        //
    }
}
