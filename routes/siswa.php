<?php

use App\Http\Controllers\SiswaController;

Route::middleware('auth')->group(function(){
    Route::get('/siswa/{siswa}/rapor', [SiswaController::class, 'rapor'])->name('siswa.rapor');
    Route::get('/siswa/{siswa}/ketidakhadiran', [SiswaController::class, 'ketidakhadiran'])->name('siswa.ketidakhadiran');
    Route::get('/siswa/{siswa}/ekskul', [SiswaController::class, 'ekskul'])->name('siswa.ekskul');
    Route::get('/siswa/{siswa}/orangtua', [SiswaController::class, 'orangtua'])->name('siswa.orangtua');
    Route::get('/siswa/{siswa}/documents', [SiswaController::class, 'documents'])->name('siswa.documents');
    Route::get('/siswa/{siswa}/asal-sekolah', [SiswaController::class, 'asalSekolah'])->name('siswa.asal-sekolah');
    Route::get('/siswa/{siswa}/akun-orangtua', [SiswaController::class, 'akunOrangtua'])->name('siswa.akun-orangtua');
    Route::put('/siswa/bulk-update', [SiswaController::class, 'bulkUpdate'])->name('siswa.bulk-update');
    Route::post('/siswa/{siswa}/storeDocument', [SiswaController::class, 'storeDocument'])->name('siswa.storeDocument');
    Route::resource('siswa', SiswaController::class);
});