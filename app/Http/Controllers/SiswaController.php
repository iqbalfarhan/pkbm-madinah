<?php

namespace App\Http\Controllers;

use App\Http\Requests\BulkUpdateSiswaRequest;
use App\Http\Requests\StoreSiswaRequest;
use App\Http\Requests\UpdateSiswaRequest;
use App\Http\Requests\UploadDocumentSiswaRequest;
use App\Http\Resources\KetidakhadiranResource;
use App\Http\Resources\SiswaResource;
use App\Models\Ekskul;
use App\Models\Kelas;
use App\Models\Ketidakhadiran;
use App\Models\Siswa;
use App\Models\Tahunajaran;
use App\Models\User;
use Illuminate\Support\Arr;
use Inertia\Inertia;
use Illuminate\Http\Request;
use Spatie\MediaLibrary\MediaCollections\Models\Media;

class SiswaController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index(Request $request)
    {
        $this->authorize('viewAny', Siswa::class);

        $status = $request->get('status') ?? "aktif";
        $kelas_id = $request->get('kelas_id');
        $gender = $request->get('gender');

        $siswas = Siswa::
            when($status, fn ($query) => $query->where('status', $status))
            ->when($kelas_id, fn ($query) => $query->where('kelas_id', $kelas_id))
            ->when($gender, fn ($query) => $query->where('gender', $gender))
            ->with('kelas')
            ->get();

        return Inertia::render('siswa/index', [
            'siswas' => SiswaResource::collection($siswas),
            'query' => $request->only(['kelas_id', 'status', 'gender']),
            'kelases' => Kelas::sekarang()->get(),
        ]);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        return Inertia::render('siswa/siswa-form');
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(StoreSiswaRequest $request)
    {
        $data = $request->validated();

        if (isset($data['dob'])) {
            $data['dob'] = date('Y-m-d', strtotime($data['dob']));
        }

        $siswa = Siswa::create($data);

        return redirect()->route('siswa.show', $siswa->id);
    }

    /**
     * Display the specified resource.
     */
    public function show(Siswa $siswa)
    {
        $this->authorize('view', $siswa);

        if ($siswa->status == "ppdb") return redirect()->route('ppdb.show', $siswa->id);

        return Inertia::render('siswa/tabs/data-diri',[
            'siswa' => $siswa->load('kelas', 'kelas.tingkat', 'ekskuls', 'rapors', 'rapors.tahunajaran'),
            'kelases' => Kelas::sekarang()->get(),
        ]);
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Siswa $siswa)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(UpdateSiswaRequest $request, Siswa $siswa)
    {
        $siswa->update($request->validated());
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Siswa $siswa)
    {
        $siswa->delete();
    }

    public function archive(){
        $siswas = Siswa::onlyTrashed()->get();
        return Inertia::render('siswa/index', [
            'siswas' => SiswaResource::collection($siswas),
            'query' => [],
            'kelases' => Kelas::sekarang()->get(),
        ]);
    }

    public function bulkUpdate(BulkUpdateSiswaRequest $request)
    {
        $data = $request->validated();
        $siswaIds = $data['siswa_ids'];

        $updateData = Arr::except($data, ['siswa_ids']);

        Siswa::whereIn('id', $siswaIds)->update($updateData);
    }

    public function rapor(Siswa $siswa)
    {
        $rapors = $siswa->rapors;
        return Inertia::render('siswa/tabs/rapor', [
            'siswa' => $siswa,
            'rapors' => $rapors->load('tahunajaran'),
            'kelases' => Kelas::sekarang()->get(),
            'tahunajarans' => Tahunajaran::orderByDesc('name')->get(),
        ]);
    }
    
    public function ketidakhadiran(Siswa $siswa)
    {
        $ta = Tahunajaran::where('active', true)->first()?->id;
        $ketidakhadirans = Ketidakhadiran::when($ta, function($q) use ($ta) {
            return $q->where('tahunajaran_id', $ta);
        })->where('siswa_id', $siswa->id)->get();

        return Inertia::render('siswa/tabs/ketidakhadiran', [
            'siswa' => $siswa,
            'ketidakhadirans' => KetidakhadiranResource::collection($ketidakhadirans),
            'kelases' => Kelas::sekarang()->get(),
        ]);
    }

    public function ekskul(Siswa $siswa)
    {
        $ekskuls = $siswa->ekskuls;
        return Inertia::render('siswa/tabs/ekskul', [
            'siswa' => $siswa,
            'ekskuls' => $ekskuls,
            'kelases' => Kelas::sekarang()->get(),
        ]);
    }

    public function asalSekolah(Siswa $siswa)
    {
        return Inertia::render('siswa/tabs/asal-sekolah', [
            'siswa' => $siswa,
            'kelases' => Kelas::sekarang()->get(),
        ]);
    }

    public function akunOrangtua(Siswa $siswa)
    {
        return Inertia::render('siswa/tabs/akun-orangtua', [
            'siswa' => $siswa->load('user', 'user.siswas'),
            'users' => User::Role('orangtua')->get(),
            'kelases' => Kelas::sekarang()->get(),
        ]);
    }

    public function documents(Siswa $siswa)
    {
        return Inertia::render('siswa/tabs/documents', [
            'siswa' => $siswa,
            'documents' => $siswa->getMedia('*'),
            'kelases' => Kelas::sekarang()->get(),
        ]);
    }

    public function storeDocument(UploadDocumentSiswaRequest $request, Siswa $siswa)
    {
        $data = $request->validated();
        // $collection_name = $siswa->id."/".$data['name'];
        $collection_name = $data['name'];
        $siswa->addMedia($data['file'])->toMediaCollection( $collection_name);
    }

    public function orangtua(Siswa $siswa)
    {
        return Inertia::render('siswa/tabs/orangtua', [
            'siswa' => $siswa,
            'orangtua' => $siswa->orangtua,
            'kelases' => Kelas::sekarang()->get(),
        ]);
    }
}
