<?php

use App\Http\Controllers\PendaftaranController;
use App\Http\Controllers\PpdbController;
use App\Http\Middleware\PpdbMiddleware;

Route::middleware(['guest'])->group(function () {
    Route::post('pendaftaran/login', [PendaftaranController::class, 'login'])->name('pendaftaran.login');
    Route::post('pendaftaran/register', [PendaftaranController::class, 'register'])->name('pendaftaran.register');
});

Route::middleware(PpdbMiddleware::class)->group(function(){
    Route::get('/pendaftaran/akun', [PendaftaranController::class, 'akun'])->name('pendaftaran.akun');
    Route::get('/pendaftaran/create', [PendaftaranController::class, 'create'])->name('pendaftaran.create');
    Route::post('/pendaftaran/create', [PendaftaranController::class, 'store'])->name('pendaftaran.store');

    Route::get('/pendaftaran/{siswa}/alamat', [PendaftaranController::class, 'alamat'])->name('pendaftaran.alamat');
    Route::post('/pendaftaran/{siswa}/alamat', [PendaftaranController::class, 'storeAlamat'])->name('pendaftaran.store-alamat');

    Route::get('/pendaftaran/{siswa}/orangtua', [PendaftaranController::class, 'orangtua'])->name('pendaftaran.orangtua');
    Route::post('/pendaftaran/{siswa}/orangtua', [PendaftaranController::class, 'storeOrangtua'])->name('pendaftaran.store-orangtua');

    Route::get('/pendaftaran/{siswa}/sekolah', [PendaftaranController::class, 'sekolah'])->name('pendaftaran.sekolah');
    Route::post('/pendaftaran/{siswa}/sekolah', [PendaftaranController::class, 'storeSekolah'])->name('pendaftaran.store-sekolah');

    Route::get('/pendaftaran/{siswa}/edit', [PendaftaranController::class, 'edit'])->name('pendaftaran.edit');
    Route::post('/pendaftaran/{siswa}/edit', [PendaftaranController::class, 'storeEdit'])->name('pendaftaran.store-edit');
    
    Route::get('/pendaftaran/{siswa}/berkas', [PendaftaranController::class, 'berkas'])->name('pendaftaran.berkas');
    Route::post('/pendaftaran/{siswa}/berkas', [PendaftaranController::class, 'storeBerkas'])->name('pendaftaran.store-berkas');

    Route::get('/pendaftaran/{siswa}/buktibayar', [PendaftaranController::class, 'buktibayar'])->name('pendaftaran.buktibayar');
    Route::post('/pendaftaran/{siswa}/buktibayar', [PendaftaranController::class, 'storeBuktibayar'])->name('pendaftaran.store-buktibayar');
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
    Route::delete('/ppdb/{ppdb}/accept', [PpdbController::class, 'accept'])->name('ppdb.accept');
});