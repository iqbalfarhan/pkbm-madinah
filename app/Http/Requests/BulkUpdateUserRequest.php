<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class BulkUpdateUserRequest extends FormRequest
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
            'user_ids' => 'required|array',
            'user_ids.*' => 'exists:users,id',
            'role' => 'nullable|string|in:admin,guru,orangtua',
        ];
    }

    public function messages()
    {
        return [
            'ids.required' => 'IDs harus diisi.',
            'ids.array' => 'IDs harus berupa array.',
            'ids.*.exists' => 'ID tidak valid.',
            'role.string' => 'Role harus berupa teks.',
            'role.in' => 'Role harus berupa admin, guru, atau orangtua.',
        ];
    }
}
