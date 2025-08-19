<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class StoreOrangtuaRequest extends FormRequest
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
            'father_name' => 'nullable',
            'father_address' => 'nullable',
            'father_phone' => 'nullable',
            'father_ocupation' => 'nullable',
            'father_salary' => 'nullable',
            'mother_name' => 'nullable',
            'mother_address' => 'nullable',
            'mother_phone' => 'nullable',
            'mother_ocupation' => 'nullable',
            'mother_salary' => 'nullable',
        ];
    }

    public function messages(): array
    {
        return [
            'siswa_id.required' => 'Siswa harus diisi',
            'siswa_id.exists' => 'Siswa tidak ditemukan',
        ];
    }
}
