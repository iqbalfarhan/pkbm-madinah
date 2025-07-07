<?php

use App\Http\Controllers\KelasController;

Route::middleware('auth')->group(function () {
    Route::get('/kelas/{kela}/rapor', [KelasController::class, 'rapor'])->name('kelas.rapor');
    Route::get('/kelas/{kela}/ekskul', [KelasController::class, 'ekskul'])->name('kelas.ekskul');
    Route::get('/kelas/{kela}/pelajaran', [KelasController::class, 'pelajaran'])->name('kelas.pelajaran');
    Route::get('/kelas/{kela}/ketidakhadiran', [KelasController::class, 'ketidakhadiran'])->name('kelas.ketidakhadiran');
    Route::resource('kelas', KelasController::class);
});