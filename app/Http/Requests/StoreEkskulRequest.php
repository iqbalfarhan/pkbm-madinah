<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class StoreEkskulRequest extends FormRequest
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
            'guru_id' => 'nullable|exists:gurus,id',
        ];
    }

    public function messages(): array
    {
        return [
            'name.required' => 'Nama ekskul harus diisi.',
            'name.string' => 'Nama ekskul harus berupa teks.',
            'name.max' => 'Nama ekskul tidak boleh lebih dari 255 karakter.',
            'guru_id.exists' => 'Guru tidak valid.',
        ];
    }
}
