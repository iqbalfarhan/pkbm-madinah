<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class UploadDocumentSiswaRequest extends FormRequest
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
            'name' => 'required|string|max:255',
            'file' => 'required|file|mimes:pdf,doc,docx,png,jpg,jpeg,gif,svg|max:2048',
        ];
    }

    public function messages(): array
    {
        return [
            'name.required' => 'nama harus diisi',
            'name.string' => 'nama harus berupa string',
            'name.max' => 'nama maksimal 255 karakter',
            'file.required' => 'file harus diisi',
            'file.file' => 'file harus berupa file',
            'file.mimes' => 'file harus berupa dokumen atau gambar dengan format yang diizinkan',
        ];
    }

}
