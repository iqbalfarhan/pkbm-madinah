<?php

namespace App\Http\Controllers;

use App\Http\Requests\StoreMaterialRequest;
use App\Http\Requests\UpdateMaterialRequest;
use App\Models\material;

class MaterialController extends Controller
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
    public function store(StoreMaterialRequest $request)
    {
        Material::create($request->validated());
    }

    /**
     * Display the specified resource.
     */
    public function show(material $material)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(material $material)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(UpdateMaterialRequest $request, material $material)
    {
        $material->update($request->validated());
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(material $material)
    {
        $material->delete();
    }
}
