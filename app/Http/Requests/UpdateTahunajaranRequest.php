<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class UpdateTahunajaranRequest extends FormRequest
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
            'name' => 'nullable|string|regex:/^\d{4}\/\d{4}$/|max:9',
            'semester' => 'nullable|string|max:255',
            'active' => 'nullable|boolean',
            'slug' => 'nullable|string|max:255|unique:tahunajarans,slug,' . $this->tahunajaran->id,
        ];
    }

    public function messages()
    {
        return [
            'name.string' => 'Nama harus berupa string',
            'name.max' => 'Nama maksimal 9 karakter',
            'name.regex' => 'Nama harus berupa format tahun/tahun',
            'semester.string' => 'Semester harus berupa string',
            'semester.max' => 'Semester maksimal 255 karakter',
            'active.boolean' => 'Aktif harus berupa boolean',
            'slug.string' => 'Slug harus berupa string',
            'slug.max' => 'Slug maksimal 255 karakter',
            'slug.unique' => 'Slug sudah digunakan',
        ];
    }
}
