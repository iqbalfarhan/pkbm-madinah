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
        Schema::create('siswas', function (Blueprint $table) {
            $table->id();
            $table->string('name');
            $table->string('nisn')->nullable();
            $table->string('nis')->nullable();
            $table->foreignId('user_id')->nullable()->constrained('users')->nullOnDelete();
            $table->foreignId('kelas_id')->nullable()->constrained('kelas')->nullOnDelete();
            $table->boolean('gender')->default(true);
            $table->string('pob')->nullable();
            $table->date('dob')->nullable();
            $table->enum('religion', ['islam', 'kristen', 'katolik', 'hindu', 'budha'])->default('islam');
            $table->string('address')->nullable();
            $table->string('phone')->nullable();
            $table->string('photo')->nullable();
            $table->string('email')->nullable();
            $table->year('register_year');
            $table->enum('status', ['ppdb', 'aktif', 'lulus', 'pindah', 'dikeluarkan'])->default('aktif');
            $table->boolean('active')->default(true);
            $table->timestamps();
            $table->softDeletes();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('siswas');
    }
};
