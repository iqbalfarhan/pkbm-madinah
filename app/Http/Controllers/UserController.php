<?php

namespace App\Http\Controllers;

use App\Http\Requests\BulkUpdateUserRequest;
use App\Http\Requests\StoreUserRequest;
use App\Http\Requests\UpdateUserRequest;
use App\Http\Resources\UserResource;
use App\Models\Guru;
use App\Models\Siswa;
use App\Models\User;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Spatie\Permission\Models\Role;

class UserController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index(Request $request)
    {
        $role = $request->get('role');

        $user = User::when($role, fn($query) => $query->where('role', $role))
            ->with('guru', 'siswas', 'roles')
            ->orderBy('name')
            ->get();

        return Inertia::render('user/index', [
            'users' => UserResource::collection($user),
            'roles' => Role::pluck('name'),
        ]);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        //
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(StoreUserRequest $request)
    {
        $data = $request->validated();
        $user = User::create($data);

        $user->syncRoles($data['roles']);
    }

    /**
     * Display the specified resource.
     */
    public function show(User $user)
    {
        return Inertia::render('guru/show', [
            'guru' => Guru::with('user')->find($user->guru->id),
        ]);
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(User $user)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(UpdateUserRequest $request, User $user)
    {
        $data = $request->validated();

        if ($request->hasFile('photo')) {
            $photo = $request->file('photo');
            $photoPath = $photo->store('user');
            $data['photo'] = $photoPath;
        }

        $user->update($data);
        $user->syncRoles($data['roles']);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(User $user)
    {
        $user->delete();
    }

    public function bulkUpdate(BulkUpdateUserRequest $request)
    {
        $userIds = $request->input('user_ids');
        $role = $request->input('role');

        User::whereIn('id', $userIds)->update(['role' => $role]);
    }

    public function bulkDelete(BulkUpdateUserRequest $request)
    {
        $userIds = $request->input('user_ids');
        User::whereIn('id', $userIds)->delete();
    }

    public function trashed()
    {
        return Inertia::render('user/trashed', [
            'users' => User::onlyTrashed()->get(),
        ]);
    }

    public function restore($user)
    {
        $user = User::onlyTrashed()->findOrFail($user);
        $user->restore();
    }

    public function forceDelete($user)
    {
        $user = User::onlyTrashed()->findOrFail($user);
        $user->forceDelete();
    }

    public function bulkRestore(BulkUpdateUserRequest $request){
        $userIds = $request->input('user_ids');
        User::onlyTrashed()->whereIn('id', $userIds)->restore();
    }

    public function bulkForceDelete(BulkUpdateUserRequest $request){
        $userIds = $request->input('user_ids');
        User::onlyTrashed()->whereIn('id', $userIds)->forceDelete();
    }
    
}
