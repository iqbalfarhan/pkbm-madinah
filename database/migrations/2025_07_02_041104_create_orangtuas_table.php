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
        Schema::create('orangtuas', function (Blueprint $table) {
            $table->id();
            $table->foreignId('siswa_id')->constrained('siswas')->onDelete('cascade');
            $table->string('father_name')->nullable();
            $table->string('father_address')->nullable();
            $table->string('father_phone')->nullable();
            $table->string('father_ocupation')->nullable();
            $table->string('mother_name')->nullable();
            $table->string('mother_address')->nullable();
            $table->string('mother_phone')->nullable();
            $table->string('mother_ocupation')->nullable();
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('orangtuas');
    }
};
