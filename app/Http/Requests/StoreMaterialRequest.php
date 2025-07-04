<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class StoreMaterialRequest extends FormRequest
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
            'mapel_id' => 'required|exists:mapels,id',
            'title' => 'required',
            'description' => 'nullable',
            'url' => 'nullable',
        ];
    }

    public function messages()
    {
        return [
            'mapel_id.required' => 'Mapel harus dipilih',
            'mapel_id.exists' => 'Mapel tidak ditemukan',
            'title.required' => 'Judul harus diisi',
            'url.required' => 'URL harus diisi',
        ];
    }
}
