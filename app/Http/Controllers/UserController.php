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

    }
    public function index(Request $request)
    {
        $search = $request->get('search');

        $users = User::query()->when($search, function ($query) use ($search) {
             $query->where('first_name', 'like', "%{$search}%")
          ->orWhere('last_name', 'like', "%{$search}%")
          ->orWhere('username', 'like', "%{$search}%");
        })->orderBy('id', 'desc')
        ->paginate(10)
        ->withQueryString();
        return Inertia::render('Dashboard', ['users' => $users, 'filters' => ['search' => $search]]);
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
