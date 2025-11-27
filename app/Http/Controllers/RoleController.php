<?php

namespace App\Http\Controllers;

use App\Http\Requests\StoreRoleRequest;
use App\Http\Requests\UpdateRoleRequest;
use App\Services\RoleService;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Spatie\Permission\Models\Role;

class RoleController extends Controller
{
    public function __construct(public RoleService $service)
    {

    }
    public function index()
    {
        return Inertia::render('Roles/Index', [
            'roles' => $this->service->all(),
            'permissions' => $this->service->allPermissions()
        ]);
    }
    public function store(StoreRoleRequest $request)
    {
        $this->service->create($request->validated());
        return back()->with('success', 'Role created successfully!');
    }
    public function update(UpdateRoleRequest $request, Role $role)
    {
        $this->service->update($role, $request->validated());
        return back()->with('success', 'Role updated successfully!');
    }
    public function destroy(Role $role)
    {
        $this->service->delete($role);
        return back()->with('success', 'Role deleted succcessfully!');
    }
}
