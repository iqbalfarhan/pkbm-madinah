<?php

namespace App\Http\Controllers;

use App\Http\Requests\StoreRoleRequest;
use App\Http\Requests\UpdateRoleRequest;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Spatie\Permission\Models\Permission;
use Spatie\Permission\Models\Role;

class RoleController extends Controller
{
    public function index()
    {
        return Inertia::render('role/index', [
            'roles' => Role::with('permissions')->whereNot('name', 'superadmin')->get(),
            'permissions' => Permission::get(),
        ]);
    }

    public function store(StoreRoleRequest $request)
    {
        $data = $request->validated();

        if ($data['type'] === 'role') {
            Role::create([
                'name' => $data['name'],
            ]);
        }
        elseif ($data['type'] === 'permission') {
            Permission::create([
                'name' => $data['name'],
            ]);
        }
    }

    public function show(Role $role)
    {
        return Inertia::render('role/show', [
            'role' => $role->load('permissions'),
            'permissions' => Permission::get(),
        ]);
    }

    public function update(UpdateRoleRequest $request, Role $role)
    {
        $role->update($request->validated());
    }

    public function togglePermission(Request $request, Role $role){
        $data = $request->validate([
            'permission_id' => 'required',
        ]);

        $permissionId = $data['permission_id'];

        $permission = Permission::findOrFail($permissionId);

        if ($role->hasPermissionTo($permission)) {
            $role->revokePermissionTo($permission);
        } else {
            $role->givePermissionTo($permission);
        }
    }
}
