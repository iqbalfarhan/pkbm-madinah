<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Inertia\Inertia;

class WelcomeController extends Model
{
    public function index () {
        return Inertia::render('welcome/index');
    }

    public function syarat()
    {
        return Inertia::render('welcome/syarat');
    }

    public function alur()
    {
        return Inertia::render('welcome/alur');
    }
}
