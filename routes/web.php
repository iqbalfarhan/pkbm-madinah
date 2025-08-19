<?php

use App\Http\Controllers\BeritaController;
use App\Http\Controllers\DashboardController;
use App\Http\Controllers\EkskulController;
use App\Http\Controllers\GuruController;
use App\Http\Controllers\KetidakhadiranController;
use App\Http\Controllers\MapelController;
use App\Http\Controllers\MapelGroupController;
use App\Http\Controllers\MaterialController;
use App\Http\Controllers\NilaiController;
use App\Http\Controllers\OrangtuaController;
use App\Http\Controllers\PelajaranController;
use App\Http\Controllers\PembayaranController;
use App\Http\Controllers\PengumumanController;
use App\Http\Controllers\RoleController;
use App\Http\Controllers\TahunajaranController;
use App\Http\Controllers\TingkatController;
use App\Http\Controllers\WelcomeController;
use Illuminate\Support\Facades\Route;
use Spatie\MediaLibrary\MediaCollections\Models\Media;

Route::get('/', [WelcomeController::class, 'index'])->name('home');
Route::get('/syarat', [WelcomeController::class, 'syarat'])->name('syarat');
Route::get('/alur', [WelcomeController::class, 'alur'])->name('alur');
Route::get('/artikel', [WelcomeController::class, 'artikel'])->name('artikel');
Route::get('/artikel/{slug}', [WelcomeController::class, 'baca'])->name('baca');
Route::post('/search-ppdb', [WelcomeController::class, 'searchPpdb'])->name('search-ppdb');

Route::middleware(['auth', 'verified'])->group(function () {
    Route::get('dashboard', [DashboardController::class, 'index'])->name('dashboard');
    Route::get('dokumentasi', [DashboardController::class, 'dokumentasi'])->name('dokumentasi');

    Route::middleware("can:tahunajaran.*")->resource('tahunajaran', TahunajaranController::class);
    Route::resource('guru', GuruController::class);
    Route::resource('mapel', MapelController::class);
    Route::resource('tingkat', TingkatController::class);
    Route::resource('mapelgroup', MapelGroupController::class);
    Route::resource('pengumuman', PengumumanController::class);
    Route::resource('ekskul', EkskulController::class);
    Route::post('berita/{berita}/upload-media', [BeritaController::class, 'uploadMedia'])->name('berita.upload-media');
    Route::resource('berita', BeritaController::class);
    Route::apiResource('material', MaterialController::class);
    Route::apiResource('pembayaran', PembayaranController::class);

    Route::resource('orangtua', OrangtuaController::class);

    Route::put('/role/{role}/toggle-permission', [RoleController::class, 'togglePermission'])->name('role.toggle-permission');
    Route::resource('role', RoleController::class);

    Route::resource('ketidakhadiran', KetidakhadiranController::class);

    Route::delete('/media/{media}', function(Media $media){
        $media->delete();
    })->name('media.destroy');

    Route::get('pelajaran/{pelajaran}/nilai', [PelajaranController::class, 'nilai'])->name('pelajaran.nilai');
    Route::apiResource('pelajaran', PelajaranController::class);

    Route::apiResource('nilai', NilaiController::class);

});

require __DIR__.'/user.php';
require __DIR__.'/rapor.php';
require __DIR__.'/ppdb.php';
require __DIR__.'/kelas.php';
require __DIR__.'/siswa.php';
require __DIR__.'/settings.php';
require __DIR__.'/auth.php';
