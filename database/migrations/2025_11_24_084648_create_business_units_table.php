<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('business_units - 2025_11_24_084648_create_business_units_table.php:14', function (Blueprint $table) {
            $table->id();
            $table->string('name')->unique();
            $table->string('location');
            $
            $table->dateTime('created_on')->current();
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('business_units');
    }
};
