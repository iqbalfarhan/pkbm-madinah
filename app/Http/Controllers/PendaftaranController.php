<?php

namespace App\Http\Controllers;

use App\Http\Requests\LoginAkunOrangTuaRequest;
use App\Http\Requests\RegisterAkunOrangTuaRequest;
use App\Http\Requests\StoreAlamatRequest;
use App\Http\Requests\StoreAsalsekolahRequest;
use App\Http\Requests\StoreDatadiriRequest;
use App\Http\Requests\StoreOrangtuaRequest;
use App\Http\Requests\StoreSiswaRequest;
use App\Http\Requests\UploadBerkasPendaftaranRequest;
use App\Http\Requests\UploadDocumentSiswaRequest;
use App\Models\Siswa;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Arr;
use Illuminate\Support\Facades\Auth;
use Inertia\Inertia;

class PendaftaranController extends Controller
{
    /**
     * Show the form for creating a new resource.
     */
    public function akun()
    {
        $user = Auth::user();
        if ($user) {
            return redirect()->route('pendaftaran.create');
        }
        return Inertia::render('ppdb/tabs/akun-tab');
    }

    public function create()
    {
        $user = Auth::user();
        if (!$user) {
            return redirect()->route('pendaftaran.akun');
        }
        return Inertia::render('ppdb/tabs/datadiri-tab');
    }

    public function edit(Siswa $siswa)
    {
        return Inertia::render('ppdb/tabs/datadiri-tab', [
            'siswa' => $siswa
        ]);
    }

    public function storeEdit(StoreDatadiriRequest $request, Siswa $siswa)
    {
        $data = $request->validated();
        $siswa->update($data);

        return redirect()->route('pendaftaran.alamat', $siswa);
    }

    public function store(StoreDatadiriRequest $request)
    {
        // Handle the storage of the datadiri information
        // This could include saving the data to the database, etc.
        // For now, we will just redirect to the next step in the registration process.

        $data = $request->validated();
        $siswa = Siswa::create($data);

        return redirect()->route('pendaftaran.alamat', $siswa);
    }

    public function alamat(Siswa $siswa)
    {
        return Inertia::render('ppdb/tabs/alamat-tab', [
            'siswa' => $siswa
        ]);
    }

    public function storeAlamat(StoreAlamatRequest $request, Siswa $siswa)
    {
        $data = $request->validated();
        $alamatParts = [
            $data['jalan'] ?? '',
            isset($data['rt']) ? 'RT ' . $data['rt'] : '',
            isset($data['rw']) ? 'RW ' . $data['rw'] : '',
            $data['kelurahan'] ?? '',
            $data['kecamatan'] ?? '',
            $data['kabupaten'] ?? '',
            $data['provinsi'] ?? '',
            $data['kode_pos'] ?? '',
        ];

        // Filter yang kosong biar gak ada koma berlebihan
        $alamat = implode(', ', array_filter($alamatParts, fn($val) => trim($val) !== ''));

        $siswa->address = $alamat;
        $siswa->save();

        return redirect()->route('pendaftaran.orangtua', $siswa);
    }

    public function orangtua(Siswa $siswa)
    {
        return Inertia::render('ppdb/tabs/orangtua-tab', [
            'siswa' => $siswa
        ]);
    }

    public function storeOrangtua(StoreOrangtuaRequest $request, Siswa $siswa)
    {
        $data = $request->validated();
        $siswa->orangtua()->updateOrCreate(
            ['siswa_id' => $siswa->id],
            $data
        );

        return redirect()->route('pendaftaran.sekolah', $siswa);
    }
    
    public function sekolah(Siswa $siswa)
    {
        return Inertia::render('ppdb/tabs/sekolah-tab', [
            'siswa' => $siswa
        ]);
    }

    public function storeSekolah(StoreAsalsekolahRequest $request, Siswa $siswa)
    {
        $data = $request->validated();
        $siswa->asalsekolah()->updateOrCreate(
            ['siswa_id' => $siswa->id],
            $data
        );

        return redirect()->route('pendaftaran.berkas', $siswa);
    }

    public function berkas(Siswa $siswa)
    {
        return Inertia::render('ppdb/tabs/berkas-tab', [
            'siswa' => $siswa->load('media')
        ]);
    }

    public function storeBerkas(UploadBerkasPendaftaranRequest $request, Siswa $siswa)
    {
        // Handle the storage of the berkas information
        // This could include saving the data to the database, etc.
        // For now, we will just redirect to the next step in the registration process.

        $data = $request->validated();

        foreach ($data as $key => $value) {
            $collection = [
                'kk' => 'kartu keluarga',
                'akte' => 'akte kelahiran',
                'ijazah' => 'ijazah',
                'pasfoto' => 'pas foto',
            ];

            if (is_null($value)) {
                continue; // Skip if the file is not provided
            }

            $siswa->addMedia($value)->toMediaCollection($collection[$key] ?? 'default');
        }

        return redirect()->route('pendaftaran.buktibayar', $siswa);
    }

    public function buktibayar(Siswa $siswa)
    {
        return Inertia::render('ppdb/tabs/buktibayar-tab', [
            'siswa' => $siswa
        ]);
    }

    public function register(RegisterAkunOrangTuaRequest $request)
    {
        // Handle the registration logic here
        // This could include creating a user account, sending confirmation emails, etc.
        // For now, we will just redirect to the next step in the registration process.

        $data = $request->validated();
        // Create the user account
        $user = User::create($data);

        $user->assignRole('orangtua'); // Assign the role to the user

        Auth::login($user); // Log in the user

        // Assuming the registration is successful, redirect to the create page
        
        return redirect()->route('pendaftaran.create');
    }

    public function login(LoginAkunOrangTuaRequest $request)
    {
        // Handle the registration logic here
        // This could include creating a user account, sending confirmation emails, etc.
        // For now, we will just redirect to the next step in the registration process.

        $credentials = $request->validated();
        if (Auth::attempt($credentials)) {
            return redirect()->route('pendaftaran.create');
        }
    }
}
