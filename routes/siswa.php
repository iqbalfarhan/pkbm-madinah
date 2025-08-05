<?php

use App\Http\Controllers\SiswaController;

Route::middleware('auth')->group(function(){
    Route::get('/siswa/archive', [SiswaController::class, 'archive'])->name('siswa.archive');
    Route::get('/siswa/{siswa}/rapor', [SiswaController::class, 'rapor'])->name('siswa.rapor');
    Route::get('/siswa/{siswa}/ketidakhadiran', [SiswaController::class, 'ketidakhadiran'])->name('siswa.ketidakhadiran');
    Route::get('/siswa/{siswa}/ekskul', [SiswaController::class, 'ekskul'])->name('siswa.ekskul');
    Route::get('/siswa/{siswa}/orangtua', [SiswaController::class, 'orangtua'])->name('siswa.orangtua');
    Route::get('/siswa/{siswa}/documents', [SiswaController::class, 'documents'])->name('siswa.documents');
    Route::get('/siswa/{siswa}/asal-sekolah', [SiswaController::class, 'asalSekolah'])->name('siswa.asal-sekolah');
    Route::get('/siswa/{siswa}/akun-orangtua', [SiswaController::class, 'akunOrangtua'])->name('siswa.akun-orangtua');
    Route::put('/siswa/bulk-update', [SiswaController::class, 'bulkUpdate'])->name('siswa.bulk-update');
    Route::post('/siswa/{siswa}/storeDocument', [SiswaController::class, 'storeDocument'])->name('siswa.storeDocument');

    Route::get('/siswa', [SiswaController::class, 'index'])->name('siswa.index');
    Route::get('/siswa/create', [SiswaController::class, 'create'])->name('siswa.create');
    Route::post('/siswa', [SiswaController::class, 'store'])->name('siswa.store');
    Route::get('/siswa/{siswa}', [SiswaController::class, 'show'])->name('siswa.show');
    Route::get('/siswa/{siswa}/edit', [SiswaController::class, 'edit'])->name('siswa.edit');
    Route::put('/siswa/{siswa}', [SiswaController::class, 'update'])->name('siswa.update');
    Route::delete('/siswa/{siswa}', [SiswaController::class, 'destroy'])->name('siswa.destroy');
    Route::post('/siswa/{siswa}/move-to-trash', [SiswaController::class, 'moveToTrash'])->name('siswa.move-to-trash');
    Route::post('/siswa/{siswa}/restore', [SiswaController::class, 'restore'])->name('siswa.restore');
    Route::delete('/siswa/{siswa}/force-delete', [SiswaController::class, 'forceDelete'])->name('siswa.force-delete');
});