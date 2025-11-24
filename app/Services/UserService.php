<?php

namespace App\Services;

use App\Models\User;

class UserService
{
    public function getAll()
    {
        return User::orderBy('id', 'desc')->get();
    }
    public function store(array $data)
    {
        $data['password'] = bcrypt($data['password']);
        return User::create($data);
    }
    public function update(User $user, array $data)
    {
        if (!empty($data['password']))
        {
            $data['password'] = bcrypt($data['password']);
        } else
        {
            unset($data['password']);
        }
        $user->update($data);
        return $user;
    }
    public function delete(User $user)
    {
        return $user->delete();
    }
}
