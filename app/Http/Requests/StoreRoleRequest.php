<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Validation\Rule;

class StoreRoleRequest extends FormRequest
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
        $type = $this->input('type');

        $nameRule = ['required', 'string'];

        if ($type === 'role') {
            $nameRule[] = Rule::unique('roles', 'name');
        } elseif ($type === 'permission') {
            $nameRule[] = Rule::unique('permissions', 'name');
        }

        return [
            'type' => ['required', Rule::in(['role', 'permission'])],
            'name' => $nameRule,
        ];
    }

    public function messages(): array
    {
        return [
            'type.required' => 'Type is required',
            'type.in' => 'Type must be either role or permission',
            'name.required' => 'Name is required',
            'name.string' => 'Name must be a string',
            'name.unique' => 'Name must be unique',
        ];
    }
}
