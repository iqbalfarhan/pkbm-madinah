<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class UpdateTingkatRequest extends FormRequest
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
            'group' => 'nullable|string|in:TK,SD,SMP,SMA,SMK',
            'name' => 'nullable|string',
        ];
    }

    public function messages()
    {
        return [
            'group.string' => 'Nama group harus berupa text',
            'group.in' => 'Nama group harus diisi dengan TK/SD/SMP/SMA/SMK',

            'name.string' => 'Nama tingkat harus berupa text',
        ];
    }
}
