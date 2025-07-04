<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Validation\Rule;

class StoreTahunajaranRequest extends FormRequest
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
            'name' => 'required|string|regex:/^\d{4}\/\d{4}$/|max:9',
            'semester' => 'required|string|max:255',
            'slug' => 'required|string|max:255|unique:tahunajarans,slug',
        ];
    }

    public function messages()
    {
        return [
            'name.required' => 'Tahun ajaran harus diisi',
            'name.string' => 'Tahun ajaran harus berupa string',
            'name.regex' => 'Tahun ajaran harus berupa format tahun/tahun',
            'name.max' => 'Tahun ajaran maksimal 9 karakter',
            'semester.required' => 'Semester harus diisi',
            'semester.string' => 'Semester harus berupa string',
            'semester.max' => 'Semester maksimal 255 karakter',
            'slug.required' => 'Slug harus diisi',
            'slug.string' => 'Slug harus berupa string',
            'slug.max' => 'Slug maksimal 255 karakter',
            'slug.unique' => 'Tahun ajaran dan semester sudah ada',
        ];
    }
}
