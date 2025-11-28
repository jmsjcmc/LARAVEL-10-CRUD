<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class BusinessUnit extends Model
{
    use HasFactory;

    protected $table = 'business_units';
    
    protected $fillable = [
        'name',
        'location',
        'creator_id',
        'created_on',
        'record_status',
    ];
}
