<?php

namespace App\Http\Controllers;

use App\Http\Requests\StoreRoleRequest;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Spatie\Permission\Models\Permission;
use Spatie\Permission\Models\Role;

class RoleController extends Controller
{
    public function index()
    {
        return Inertia::render('role/index', [
            'roles' => Role::where('name', '!=', 'superadmin')->with('permissions')->get(),
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
}
