<?php

namespace App\Http\Controllers;

use App\Http\Requests\StoreMapelGroupRequest;
use App\Http\Requests\UpdateMapelGroupRequest;
use App\Models\MapelGroup;

class MapelGroupController extends Controller
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
    public function store(StoreMapelGroupRequest $request)
    {
        MapelGroup::create($request->validated());
    }

    /**
     * Display the specified resource.
     */
    public function show(MapelGroup $mapelgroup)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(MapelGroup $mapelgroup)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(UpdateMapelGroupRequest $request, MapelGroup $mapelgroup)
    {
        $mapelgroup->update($request->validated());
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(MapelGroup $mapelgroup)
    {
        $mapelgroup->delete();
    }
}
