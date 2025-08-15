<?php

namespace App\Http\Controllers;

use App\Models\Berita;
use App\Models\Siswa;
use Illuminate\Http\Request;
use Inertia\Inertia;

class WelcomeController extends Controller
{
    public function index ()
    {
        return Inertia::render('welcome/index' );
    }

    public function syarat()
    {
        return Inertia::render('welcome/syarat');
    }

    public function alur()
    {
        return Inertia::render('welcome/alur');
    }

    public function searchPpdb(Request $request)
    {
        $data = $request->validate([
            'value' => [
                'required',
                'string',
                function ($attribute, $value, $fail) {
                    $exists = Siswa::where('id', $value)
                        ->orWhere('nisn', $value)
                        ->exists();

                    if (! $exists) {
                        $fail('Siswa dengan ID atau NISN tersebut tidak ditemukan.');
                    }
                },
            ],
        ], [
            'value.required' => 'Field tidak boleh kosong.',
            'value.string' => 'Format pencarian tidak valid.',
        ]);
        
        $siswa = Siswa::where('id', $data['value'])
            ->orWhere('nisn', $data['value'])
            ->first() ?? null;

        return $siswa;
    }

    public function artikel()
    {
        return Inertia::render('welcome/berita', [
            'beritas' => Berita::get(),
        ]);
    }

    public function baca($slug)
    {
        $berita = Berita::where('slug', $slug)->first();
        return Inertia::render('welcome/baca', [
            'berita' => $berita,
        ]);
    }
}
