<?php

namespace App\Http\Controllers;

use App\Http\Requests\StoreUserRequest;
use App\Http\Requests\UpdateUserRequest;
use App\Models\User;
use App\Services\UserService;
use Illuminate\Http\Request;
use Inertia\Inertia;

class UserController extends Controller
{
    public function __construct(public UserService $service)
    {
        throw new \Exception('Not implemented');
    }
    public function index()
    {
        return Inertia::render('Users/Index', ['users' => $this->service->getAll()]);
    }
    public function store(StoreUserRequest $request)
    {
        $this->service->store($request->validated());
        return back()->with('success', 'User created!');
    }
    public function update(UpdateUserRequest $request, User $user)
    {
        $this->service->update($user, $request->validated());
        return back()->with('success', 'User updated!');
    }
    public function destroy(User $user)
    {
        $this->service->delete($user);
        return back()->with('success', 'User deleted!');
    }
}
