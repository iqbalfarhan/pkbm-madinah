<?php

use App\Http\Controllers\UserController;

Route::middleware(['auth', 'verified'])->group(function () {
    Route::put('/user/{user}/restore', [UserController::class, 'restore'])->name('user.restore');
    Route::delete('/user/{user}/force-delete', [UserController::class, 'forceDelete'])->name('user.force-delete');
    Route::get('/user/trashed', [UserController::class, 'trashed'])->name('user.trashed');
    Route::put('/user/bulk-update', [UserController::class, 'bulkUpdate'])->name('user.bulk-update');
    Route::delete('/user/bulk-delete', [UserController::class, 'bulkDelete'])->name('user.bulk-delete');
    Route::put('/user/bulk-restore', [UserController::class, 'bulkRestore'])->name('user.bulk-restore');
    Route::delete('/user/bulk-force-delete', [UserController::class, 'bulkForceDelete'])->name('user.bulk-force-delete');
    Route::resource('user', UserController::class);
});