<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class UpdateSiswaRequest extends FormRequest
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
            'name' => 'nullable',
            'nisn' => 'nullable',
            'user_id' => 'nullable|exists:users,id',
            'kelas_id' => 'nullable|exists:kelas,id',
            'gender' => 'nullable|in:Laki-laki,Perempuan',
            'pob' => 'nullable',
            'dob' => 'nullable',
            'religion' => 'nullable|in:islam,kristen,katolik,hindu,budha',
            'address' => 'nullable',
            'phone' => 'nullable|string|regex:/^\+62\d{8,11}$/',
            'email' => 'nullable|email',
            'active' => 'nullable|boolean',
            'photo' => 'nullable|image|mimes:jpeg,png,jpg,gif,svg|max:2048',
        ];
    }

    public function messages(): array
    {
        return [
            'user_id.exists' => 'The selected user does not exist.',
            'kelas_id.exists' => 'The selected kelas does not exist.',
            'gender.in' => 'The gender must be either "Laki-laki" or "Perempuan".',
            'religion.in' => 'The religion must be one of the following: islam, kristen, katolik, hindu, budha.',
            'phone.regex' => 'The phone number format is invalid. It should start with +62 and have 8 to 11 digits.',
            'email.email' => 'The email address is invalid.',
            'active.boolean' => 'The active field must be a boolean value.',
            'photo.image' => 'The photo must be an image file.',
            'photo.mimes' => 'The photo must be a file of type: jpeg, png, jpg, gif, svg.',
        ];
    }
}
