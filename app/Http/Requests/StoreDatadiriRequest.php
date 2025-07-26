<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class StoreDatadiriRequest extends FormRequest
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
            'nisn' => 'nullable',
            'nis' => 'nullable',
            'user_id' => 'nullable|exists:users,id',
            'gender' => 'nullable|in:Laki-laki,Perempuan',
            'pob' => 'nullable',
            'dob' => 'nullable',
            'phone' => 'nullable|regex:/^\+62[0-9]{9,13}$/',
            'email' => 'nullable|email',
            'religion' => 'nullable|in:islam,kristen,katolik,hindu,budha',
            'register_year' => 'required|integer',
            'status' => 'nullable|in:ppdb',
        ];
    }

    public function messages(): array
    {
        return [
            'name.required' => 'Nama siswa harus diisi.',
            'nisn.required' => 'NISN harus diisi.',
            'nis.required' => 'NIS harus diisi.',
            'user_id.exists' => 'The selected user does not exist.',
            'gender.in' => 'The gender must be either "Laki-laki" or "Perempuan".',
            'religion.in' => 'The religion must be one of the following: islam, kristen, katolik, hindu, budha.',
            'phone.regex' => 'Format nomor telepon tidak valid. Harus diawali dengan +62 dan memiliki panjang 10-14 digit.',
            'email.email' => 'The email address is invalid.',
            'active.boolean' => 'The active field must be a boolean value.',
            'photo.image' => 'The photo must be an image file.',
            'photo.mimes' => 'The photo must be a file of type: jpeg, png, jpg, gif, svg.',
            'register_year.integer' => 'The register year must be an integer.',
            'register_year.required' => 'Tahun masuk siswa harus diisi.',
        ];
    }
}
