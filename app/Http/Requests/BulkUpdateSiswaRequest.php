<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class BulkUpdateSiswaRequest extends FormRequest
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
            'siswa_ids' => 'required|array',
            'siswa_ids.*' => 'exists:siswas,id',
            'kelas_id' => 'nullable|exists:kelas,id',
            'status' => 'nullable|string'
        ];
    }

    public function messages()
    {
        return [
            'siswa_ids.required' => 'Pilih siswa yang akan diupdate.',
            'siswa_ids.*.exists' => 'Siswa yang dipilih tidak valid.',
            'kelas_id.exists' => 'Kelas yang dipilih tidak valid.',
            'status.string' => 'Status harus berupa string.',
        ];
    }
}
