<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class StoreMapelRequest extends FormRequest
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
            'name' => 'required',
            'description' => 'nullable|max:255',
            'photo' => 'nullable|image|max:2048',
            'tingkat_id' => 'required|exists:tingkats,id',
            'guru_id' => 'required|exists:gurus,id',
            'mapel_group_id' => 'required|exists:mapel_groups,id',
        ];
    }

    public function messages()
    {
        return [
            'name.required' => 'Nama mapel harus diisi',

            'description.max' => 'Deskripsi maksimal 255 karakter',

            'photo.image' => 'Foto harus berupa gambar',
            'photo.max' => 'Foto maksimal 2MB',

            'tingkat_id.required' => 'Tingkat harus diisi',
            'tingkat_id.exists' => 'Tingkat tidak valid',

            'guru_id.required' => 'Guru harus',
            'guru_id.exists' => 'Guru tidak valid',
            
            'mapel_group_id.required' => 'Grup mapel harus diisi',
            'mapel_group_id.exists' => 'Grup mapel tidak valid',
        ];
    }
}
