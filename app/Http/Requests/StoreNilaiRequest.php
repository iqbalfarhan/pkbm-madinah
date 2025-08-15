<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class StoreNilaiRequest extends FormRequest
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
            'pelajaran_id' => 'required|exists:pelajarans,id',
            'siswa_id' => 'required|exists:siswas,id',
            'nilai_tugas' => 'required|numeric|max:100',
            'nilai_evaluasi' => 'required|numeric|max:100',
        ];
    }

    public function messages()
    {
        return [
            'pelajaran_id.required' => 'Pelajaran harus dipilih.',
            'siswa_id.required' => 'Siswa harus dipilih.',
            'nilai_tugas.required' => 'Nilai harus diisi.',
            'nilai_tugas.numeric' => 'Nilai harus berupa angka.',
            'nilai_evaluasi.required' => 'Nilai harus diisi.',
            'nilai_evaluasi.numeric' => 'Nilai harus berupa angka.',
            'max' => ":attiribute tidak boleh lebih dari :max"
        ];
    }
}
