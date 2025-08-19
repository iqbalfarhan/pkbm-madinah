<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class UpdatePembayaranRequest extends FormRequest
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
            'keterangan' => 'nullable|string|max:255',
            'nominal' => 'nullable|numeric',
            'paid' => 'nullable|boolean',
            'paid_at' => 'nullable|timestamp',
        ];
    }

    public function messages(): array
    {
        return [
            'max' => ':attribute tidak boleh lebih dari :max karakter.',
            'nominal.numeric' => 'Nominal pembayaran harus berupa angka.',
            'paid.boolean' => 'Status pembayaran harus berupa boolean.',
        ];
    }
}
