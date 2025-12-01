<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Department extends Model
{
    use HasFactory;

    protected $table = 'departments';

    protected $fillable = [
        'name',
        'creator_id',
        'created_on',
        'record_status'
    ];

    protected $casts = [
        'name' => 'string',
        'creator_id' => 'integer',
        'created_on' => 'datetime',
        'record_status' => ''
    ];
}
