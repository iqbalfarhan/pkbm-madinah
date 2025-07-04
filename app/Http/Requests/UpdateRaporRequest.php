<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class UpdateRaporRequest extends FormRequest
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
            'siswa_id' => 'required|exists:siswas,id',
            'tahunajaran_id' => 'required|exists:tahunajarans,id',
            'jenis' => 'required',
            'data' => 'nullable',
            'pdf_path' => 'nullable',
            'publish' => 'nullable|boolean',
        ];
    }

    public function messages(): array
    {
        return [
            'siswa_id.required' => 'Siswa harus diisi',
            'siswa_id.exists' => 'Siswa tidak ditemukan',
            'tahunajaran_id.required' => 'Tahun Ajaran harus diisi',
            'tahunajaran_id.exists' => 'Tahun Ajaran tidak ditemukan',
            'jenis.required' => 'Jenis harus diisi',
            'publish.boolean' => 'Publish harus berupa boolean',
        ];
    }
}
