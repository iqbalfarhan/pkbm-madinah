<?php

use App\Http\Controllers\KelasController;

Route::middleware('auth')->prefix('kelas')->group(function () {

    Route::middleware('can:menampilkan list kelas')->get('/', [KelasController::class, 'index'])->name('kelas.index');
    Route::middleware('can:menampilkan list kelas')->get('/all', [KelasController::class, 'all'])->name('kelas.all');
    
    Route::middleware('can:menambahkan kelas baru')->group(function () {
        Route::get('/create', [KelasController::class, 'create'])->name('kelas.create');
        Route::post('/', [KelasController::class, 'store'])->name('kelas.store');
    });
    
    Route::middleware('can:mengedit data kelas')->group(function () {
        Route::get('/{kela}/edit', [KelasController::class, 'edit'])->name('kelas.edit');
        Route::put('/{kela}', [KelasController::class, 'update'])->name('kelas.update');
    });
    
    Route::middleware('can:menampilkan detail kelas')->group(function () {
        Route::get('/{kela}/rapor', [KelasController::class, 'rapor'])->name('kelas.rapor');
        Route::get('/{kela}/ekskul', [KelasController::class, 'ekskul'])->name('kelas.ekskul');
        Route::get('/{kela}/pelajaran', [KelasController::class, 'pelajaran'])->name('kelas.pelajaran');
        Route::get('/{kela}/ketidakhadiran', [KelasController::class, 'ketidakhadiran'])->name('kelas.ketidakhadiran');
        Route::get('/{kela}', [KelasController::class, 'show'])->name('kelas.show');
    });

    Route::middleware('can:menghapus data kelas')->delete('/{kela}', [KelasController::class, 'destroy'])->name('kelas.destroy');

});