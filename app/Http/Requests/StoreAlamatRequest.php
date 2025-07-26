<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class StoreAlamatRequest extends FormRequest
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
            'provinsi' => 'required|string|max:255',
            'kabupaten' => 'required|string|max:255',
            'kecamatan' => 'required|string|max:255',
            'kelurahan' => 'required|string|max:255',
            'jalan' => 'required|string|max:255',
            'rt' => 'nullable|string|max:10',
            'rw' => 'nullable|string|max:10',
            'kode_pos' => 'nullable|string|max:10',
        ];
    }

    /**
     * Get the error messages for the defined validation rules.
     *
     * @return array<string, string>
     */
    public function messages(): array
    {
        return [
            'provinsi.required' => 'Provinsi is required.',
            'kabupaten.required' => 'Kabupaten is required.',
            'kecamatan.required' => 'Kecamatan is required.',
            'kelurahan.required' => 'Kelurahan is required.',
            'jalan.required' => 'Nama jalan dan nomor rumah harus diisi.',
            'rt.required' => 'RT is required.',
            'rw.required' => 'RW is required.',
            'kode_pos.max' => 'Kode Pos must not exceed 10 characters.',
        ];
    }
}
