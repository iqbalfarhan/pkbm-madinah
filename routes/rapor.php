<?php

use App\Http\Controllers\RaporController;
use Illuminate\Support\Facades\Route;

Route::middleware(['auth', 'verified'])->group(function () {
    Route::get('/rapor/{rapor}/pdf/stream', [RaporController::class, 'streamPdf'])->name('rapor.stream');
    Route::get('/rapor/{rapor}/pdf/download', [RaporController::class, 'downloadPdf'])->name('rapor.download');
    Route::put('/rapor/{rapor}/sync-nilai', [RaporController::class, 'syncNilai'])->name('rapor.sync-nilai');
    
    Route::resource('rapor', RaporController::class);
});