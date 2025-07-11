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
        Schema::create('ketidakhadirans', function (Blueprint $table) {
            $table->id();
            $table->foreignId('tahunajaran_id')->nullable()->constrained('tahunajarans')->nullOnDelete();
            $table->foreignId('siswa_id')->constrained('siswas')->onDelete('cascade');
            $table->date('date');
            $table->text('reason');
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('ketidakhadirans');
    }
};
