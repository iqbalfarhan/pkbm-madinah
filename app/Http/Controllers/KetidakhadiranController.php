<?php

namespace App\Http\Controllers;

use App\Http\Requests\StoreKetidakhadiranRequest;
use App\Http\Requests\UpdateKetidakhadiranRequest;
use App\Models\Ketidakhadiran;

class KetidakhadiranController extends Controller
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
    public function store(StoreKetidakhadiranRequest $request)
    {
        Ketidakhadiran::create($request->validated());
    }

    /**
     * Display the specified resource.
     */
    public function show(Ketidakhadiran $ketidakhadiran)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Ketidakhadiran $ketidakhadiran)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(UpdateKetidakhadiranRequest $request, Ketidakhadiran $ketidakhadiran)
    {
        $ketidakhadiran->update($request->validated());
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Ketidakhadiran $ketidakhadiran)
    {
        $ketidakhadiran->delete();
    }
}
