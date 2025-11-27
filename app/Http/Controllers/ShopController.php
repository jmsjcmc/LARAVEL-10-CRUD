<?php

namespace App\Http\Controllers;

use App\Services\ShopService;
use Illuminate\Http\Request;
use Inertia\Inertia;

class ShopController extends Controller
{
    public function __construct(public ShopService $service)
    {

    }

    public function index()
    {
        return Inertia::render('User/Shop');
    }
}
