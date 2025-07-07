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
        Schema::create('rapors', function (Blueprint $table) {
            $table->id();
            $table->foreignId('siswa_id')->constrained('siswas')->cascadeOnDelete();
            $table->string('jenis');
            $table->foreignId('tahunajaran_id')->constrained('tahunajarans')->cascadeOnDelete();
            $table->json('data')->nullable();
            $table->string('pdf_path')->nullable();
            $table->text('teacher_comment')->nullable();
            $table->text('student_comment')->nullable();
            $table->text('parent_comment')->nullable();
            $table->boolean('publish')->default(false);
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('rapors');
    }
};
