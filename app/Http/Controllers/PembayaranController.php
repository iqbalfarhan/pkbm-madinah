<?php

namespace App\Http\Controllers;

use App\Http\Requests\StorePembayaranRequest;
use App\Http\Requests\UpdatePembayaranRequest;
use App\Models\Pembayaran;
use Inertia\Inertia;

class PembayaranController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        return Inertia::render('pembayaran/index', [
            'pembayarans' => Pembayaran::with('siswa')->get()
        ]);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(StorePembayaranRequest $request)
    {
        $data = $request->validated();
        Pembayaran::create($data);
    }

    /**
     * Display the specified resource.
     */
    public function show(Pembayaran $pembayaran)
    {
        return Inertia::render('pembayaran/show', [
            'pembayaran' => $pembayaran
        ]);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(UpdatePembayaranRequest $request, Pembayaran $pembayaran)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Pembayaran $pembayaran)
    {
        //
    }
}
