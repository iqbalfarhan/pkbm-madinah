<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class UpdateBeritaRequest extends FormRequest
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
            'judul' => "nullable|max:255",
            'content' => "nullable|string",
        ];
    }

    public function messages()
    {
        return [
            'judul.max' => 'Judul berita tidak boleh lebih dari :max karakter.',
            'content.string' => 'Content berita Harus berupa text.',
        ];
    }
}
