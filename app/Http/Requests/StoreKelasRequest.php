<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class StoreKelasRequest extends FormRequest
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
            'name' => 'required',
            'tingkat_id' => 'required|exists:tingkats,id',
            'guru_id' => 'nullable|exists:gurus,id',
        ];
    }

    public function messages(): array
    {
        return [
            'name.required' => 'Nama kelas harus diisi.',
            'tingkat_id.required' => 'Tingkat kelas harus diisi.',
            'tingkat_id.exists' => 'Tingkat kelas tidak valid.',
            'guru_id.exists' => 'Wali kelas tidak valid.',
        ];
    }
}
