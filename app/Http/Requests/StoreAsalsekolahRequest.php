<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class StoreAsalsekolahRequest extends FormRequest
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
            'name' => 'required|string',
            'address' => 'nullable|string',
        ];
    }

    public function messages(): array
    {
        return [
            'siswa_id.required' => 'Siswa harus diisi',
            'siswa_id.exists' => 'Siswa tidak ditemukan',
            'name.required' => 'Nama harus diisi',
            'name.string' => 'Nama harus berupa string',
            'address.string' => 'Alamat harus berupa string',
        ];
    }
}
