<?php

use App\Http\Controllers\PendaftaranController;
use App\Http\Controllers\PpdbController;
use App\Http\Middleware\PpdbMiddleware;

Route::middleware(['guest'])->group(function () {
});

Route::middleware(PpdbMiddleware::class)->group(function(){
    Route::get('/pendaftaran/create', [PendaftaranController::class, 'create'])->name('pendaftaran.create');
    Route::get('/pendaftaran/{siswa}/alamat', [PendaftaranController::class, 'alamat'])->name('pendaftaran.alamat');
    Route::get('/pendaftaran/{siswa}/orangtua', [PendaftaranController::class, 'orangtua'])->name('pendaftaran.orangtua');
    Route::get('/pendaftaran/{siswa}/sekolah', [PendaftaranController::class, 'sekolah'])->name('pendaftaran.sekolah');
    Route::get('/pendaftaran/{siswa}/berkas', [PendaftaranController::class, 'berkas'])->name('pendaftaran.berkas');
});

Route::middleware(['auth', 'verified', PpdbMiddleware::class])->group(function () {
    Route::post('/ppdb/setting', [PpdbController::class, 'setting'])->name('ppdb.setting');

    Route::get('/ppdb', [PpdbController::class, 'index'])->name('ppdb.index');
    Route::get('/ppdb/create', [PpdbController::class, 'create'])->name('ppdb.create');
    Route::post('/ppdb', [PpdbController::class, 'store'])->name('ppdb.store');
    Route::get('/ppdb/{ppdb}', [PpdbController::class, 'show'])->name('ppdb.show');
    Route::get('/ppdb/{ppdb}/edit', [PpdbController::class, 'edit'])->name('ppdb.edit');
    Route::put('/ppdb/{ppdb}', [PpdbController::class, 'update'])->name('ppdb.update');
    Route::delete('/ppdb/{ppdb}', [PpdbController::class, 'destroy'])->name('ppdb.destroy');
});