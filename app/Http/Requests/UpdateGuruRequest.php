<?php

namespace App\Http\Requests;

use App\Rules\GenderIn;
use App\Rules\PhoneNumber;
use Illuminate\Foundation\Http\FormRequest;

class UpdateGuruRequest extends FormRequest
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
            'name' => 'required|string|max:255',
            'nip' => 'nullable|string|max:255|unique:gurus,nip,'.$this->guru->id,
            'address' => 'nullable|string|max:255',
            'phone' => [new PhoneNumber],
            'email' => 'nullable|email|unique:gurus,email,'.$this->guru->id,
            'photo' => 'nullable|image|mimes:jpeg,png,jpg,gif,svg|max:2048',
            'gender' => [
                'nullable',
                'string',
                new GenderIn
            ],
            'active' => 'nullable|boolean',
            'user_id' => 'nullable|integer|exists:users,id',
        ];
    }

    public function messages(): array
    {
        return [
            'name.required' => 'Nama harus diisi',
            'name.string' => 'Nama harus berupa string',
            'name.max' => 'Nama maksimal 255 karakter',

            'nip.unique' => 'NIP sudah terdaftar',
            'nip.string' => 'NIP harus berupa string',
            'nip.max' => 'NIP maksimal 255 karakter',

            'address.string' => 'Alamat harus berupa string',
            'address.max' => 'Alamat maksimal 255 karakter',

            'phone.regex' => 'Nomor telepon harus menggunakan format +62xxxxxxxxxx',
            'phone.string' => 'Nomor telepon harus berupa string',
            'phone.max' => 'Nomor telepon maksimal 255 karakter',
            'phone.unique' => 'Nomor telepon sudah terdaftar',

            'email.email' => 'Email harus berupa email',
            'email.unique' => 'Email sudah terdaftar',
            'email.string' => 'Email harus berupa string',
            'email.max' => 'Email maksimal 255 karakter',

            'photo.image' => 'Foto harus berupa gambar',
            'photo.mimes' => 'Foto harus berupa gambar dengan format jpeg, png, jpg, gif, svg',
            'photo.max' => 'Foto maksimal 2048 KB',

            'gender.in' => 'Jenis kelamin harus berupa laki-laki atau perempuan',
            'gender.string' => 'Jenis kelamin harus berupa string',
            'gender.max' => 'Jenis kelamin maksimal 255 karakter',
            
            'active.boolean' => 'Status aktif harus berupa boolean',

            'user_id.integer' => 'User ID harus berupa integer',
            'user_id.exists' => 'User ID tidak ditemukan',
        ];
    }
}
