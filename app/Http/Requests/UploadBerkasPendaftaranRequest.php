<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class UploadBerkasPendaftaranRequest extends FormRequest
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
            'kk' => 'nullable|file|mimes:jpg,jpeg,png,pdf|max:2048',
            'akte' => 'nullable|file|mimes:jpg,jpeg,png,pdf|max:2048',
            'ijazah' => 'nullable|file|mimes:jpg,jpeg,png,pdf|max:2048',
            'pasfoto' => 'nullable|file|mimes:jpg,jpeg,png|max:2048',
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
            'kk.file' => 'File Kartu Keluarga harus berupa file.',
            'akte.file' => 'File Akta Kelahiran harus berupa file.',
            'ijazah.file' => 'File Ijazah harus berupa file.',
            'pasfoto.file' => 'File Pasfoto harus berupa file.',
            'kk.mimes' => 'File KK harus berupa gambar (jpg, jpeg, png) atau PDF.',
            'akte.mimes' => 'File Akte harus berupa gambar (jpg, jpeg, png) atau PDF.',
            'ijazah.mimes' => 'File Ijazah harus berupa gambar (jpg, jpeg, png) atau PDF.',
            'pasfoto.mimes' => 'File Pasfoto harus berupa gambar (jpg, jpeg, png).',
        ];
    }
}
