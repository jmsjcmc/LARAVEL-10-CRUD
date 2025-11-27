<?php

namespace App\Services;

use Spatie\Permission\Models\Permission;
use Spatie\Permission\Models\Role;

class RoleService
{
    public function all ()
    {
        return Role::with('permissions')->get();
    }
    public function allPermissions()
    {
        return Permission::all();
    }
    public function create(array $data)
    {
        $role = Role::create(['name' => $data['name']]);
        $role->syncPermissions($data['permissions'] ?? []);
        return $role;
    }
    public function update(Role $role, array $data)
    {
        $role->update(['name' => $data['name']]);
        $role->syncPermissions($data['permissions'] ?? []);
        return $role;
    }
    public function delete(Role $role)
    {
        $role->delete();
    }
}
