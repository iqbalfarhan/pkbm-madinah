<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class UpdateNilaiRequest extends FormRequest
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
            'nilai_tugas' => 'nullable|numeric|max:100',
            'nilai_evaluasi' => 'nullable|numeric|max:100',
        ];
    }

    public function messages()
    {
        return [
            'nilai_tugas.required' => 'Nilai harus diisi.',
            'nilai_tugas.numeric' => 'Nilai harus berupa angka.',
            'nilai_evaluasi.required' => 'Nilai harus diisi.',
            'nilai_evaluasi.numeric' => 'Nilai harus berupa angka.',
            'max' => ':attribute tidak boleh lebih dari :max'
        ];
    }
}
