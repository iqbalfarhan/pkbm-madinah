<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class StoreBuktiBayarRequest extends FormRequest
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
            'bukti_bayar' => 'required|file|mimes:jpg,jpeg,png,pdf|max:2048',
        ];
    }

    public function messages()
    {
        return [
            'bukti_bayar.required' => 'File bukti bayar harus diisi.',
            'bukti_bayar.file' => 'File bukti bayar harus berupa file.',
            'bukti_bayar.mimes' => 'File bukti bayar harus berupa gambar (jpg, jpeg, png) atau PDF.',
        ];
    }
}
