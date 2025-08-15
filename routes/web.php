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
use App\Http\Controllers\PengumumanController;
use App\Http\Controllers\RaporController;
use App\Http\Controllers\RoleController;
use App\Http\Controllers\TahunajaranController;
use App\Http\Controllers\TingkatController;
use App\Http\Controllers\UserController;
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

    Route::put('/user/{user}/restore', [UserController::class, 'restore'])->name('user.restore');
    Route::delete('/user/{user}/force-delete', [UserController::class, 'forceDelete'])->name('user.force-delete');
    Route::get('/user/trashed', [UserController::class, 'trashed'])->name('user.trashed');
    Route::put('/user/bulk-update', [UserController::class, 'bulkUpdate'])->name('user.bulk-update');
    Route::delete('/user/bulk-delete', [UserController::class, 'bulkDelete'])->name('user.bulk-delete');
    Route::put('/user/bulk-restore', [UserController::class, 'bulkRestore'])->name('user.bulk-restore');
    Route::delete('/user/bulk-force-delete', [UserController::class, 'bulkForceDelete'])->name('user.bulk-force-delete');
    Route::resource('user', UserController::class);

    Route::middleware("can:tahunajaran.*")->resource('tahunajaran', TahunajaranController::class);
    Route::resource('guru', GuruController::class);
    Route::resource('mapel', MapelController::class);
    Route::resource('tingkat', TingkatController::class);
    Route::resource('mapelgroup', MapelGroupController::class);
    Route::resource('pengumuman', PengumumanController::class);
    Route::resource('ekskul', EkskulController::class);
    Route::resource('berita', BeritaController::class);
    Route::apiResource('material', MaterialController::class);

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

require __DIR__.'/rapor.php';
require __DIR__.'/ppdb.php';
require __DIR__.'/kelas.php';
require __DIR__.'/siswa.php';
require __DIR__.'/settings.php';
require __DIR__.'/auth.php';
