<?php

use App\Http\Controllers\DashboardController;
use App\Http\Controllers\EkskulController;
use App\Http\Controllers\GuruController;
use App\Http\Controllers\KelasController;
use App\Http\Controllers\MapelController;
use App\Http\Controllers\MapelGroupController;
use App\Http\Controllers\OrangtuaController;
use App\Http\Controllers\PengumumanController;
use App\Http\Controllers\PpdbController;
use App\Http\Controllers\RaporController;
use App\Http\Controllers\SiswaController;
use App\Http\Controllers\TahunajaranController;
use App\Http\Controllers\TingkatController;
use App\Http\Controllers\UserController;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;
use Spatie\MediaLibrary\MediaCollections\Models\Media;

Route::get('/', function () {
    return Inertia::render('welcome');
})->name('home');

Route::middleware(['auth', 'verified'])->group(function () {
    Route::get('dashboard', [DashboardController::class, 'index'])->name('dashboard');
    Route::get('dokumentasi', [DashboardController::class, 'dokumentasi'])->name('dokumentasi');

    Route::put('/user/{user}/restore', [UserController::class, 'restore'])->name('user.restore');
    Route::delete('/user/{user}/force-delete', [UserController::class, 'forceDelete'])->name('user.force-delete');
    Route::get('/user/trashed', [UserController::class, 'trashed'])->name('user.trashed');
    Route::put('/user/bulk-update', [UserController::class, 'bulkUpdate'])->name('user.bulk-update');
    Route::delete('/user/bulk-delete', [UserController::class, 'bulkDelete'])->name('user.bulk-delete');
    Route::put('/user/bulk-restore', [UserController::class, 'bulkRestore'])->name('user.bulk-restore');
    Route::delete('/user/bulk-force-delete', [UserController::class, 'bulkForceDelete'])->name('user.bulk-force-delete');
    Route::resource('user', UserController::class);

    Route::resource('tahunajaran', TahunajaranController::class);
    Route::resource('guru', GuruController::class);
    Route::resource('mapel', MapelController::class);
    Route::resource('tingkat', TingkatController::class);
    Route::resource('mapelgroup', MapelGroupController::class);
    Route::resource('pengumuman', PengumumanController::class);
    Route::resource('kelas', KelasController::class);
    Route::resource('ekskul', EkskulController::class);

    Route::get('/ppdb/setting', [PpdbController::class, 'setting'])->name('ppdb.setting');
    Route::resource('ppdb', PpdbController::class);

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
    Route::resource('orangtua', OrangtuaController::class);

    Route::get('/rapor/{rapor}/pdf', [RaporController::class, 'downloadPdf'])->name('rapor.pdf');
    Route::resource('rapor', RaporController::class);

    Route::delete('/media/{media}', function(Media $media){
        $media->delete();
    })->name('media.destroy');

});

require __DIR__.'/settings.php';
require __DIR__.'/auth.php';
