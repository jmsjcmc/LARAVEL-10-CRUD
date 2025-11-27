<?php

namespace App\Providers;

use App\Http\Resources\UserResource;
use Illuminate\Support\ServiceProvider;
use Inertia\Inertia;

class AppServiceProvider extends ServiceProvider
{
    /**
     * Register any application services.
     */
    public function register(): void
    {
        //
    }

    /**
     * Bootstrap any application services.
     */
    public function boot(): void
    {
        //
        Inertia::share([
            'auth' => [
                'user' => fn () =>
                auth()->check()
                ? new UserResource(auth()->user())
                : null
            ]
            ]);
    }
}
