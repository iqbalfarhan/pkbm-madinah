<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class StoreKetidakhadiranRequest extends FormRequest
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
            'tahunajaran_id' => "required|exists:tahunajarans,id",
            'siswa_id' => "required|exists:siswas,id",
            'date' => "required",
            'reason' => "required",
        ];
    }

    public function messages(): array
    {
        return [
            'tahunajaran_id.required' => 'Tahun Ajaran harus diisi',
            'tahunajaran_id.exists' => 'Tahun Ajaran tidak valid',
            'siswa_id.required' => 'Siswa harus diisi',
            'siswa_id.exists' => 'Siswa tidak valid',
            'date.required' => 'Tanggal harus diisi',
            'reason.required' => 'Alasan harus diisi',
        ];
    }
}
