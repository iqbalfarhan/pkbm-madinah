<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class StorePelajaranRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     */
    public function authorize(): bool
    {
        return true;
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array<string, \Illuminate\Contracts\Validation\ValidationRule|array<mixed>|string>
     */
    public function rules(): array
    {
        return [
            'mapel_id' => 'required|exists:mapels,id',
            'guru_id' => 'required|exists:gurus,id',
            'kelas_id' => 'required|exists:kelas,id',
        ];
    }

    public function messages(): array
    {
        return [
            'mapel_id.required' => 'Nama pelajaran harus diisi',
            'mapel_id.exists' => 'Nama pelajaran tidak ditemukan',
            'guru_id.required' => 'Guru harus diisi',
            'guru_id.exists' => 'Guru tidak ditemukan',
            'kelas_id.required' => 'Kelas harus diisi',
            'kelas_id.exists' => 'Kelas tidak ditemukan',
        ];
    }
}
