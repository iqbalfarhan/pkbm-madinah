<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class PpdbSettingSettingRequest extends FormRequest
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
            "PPDB_OPEN" => "required|string",
            "PPDB_TAHUNAJARAN_ID" => "required|exists:tahunajarans,id",
        ];
    }

    public function messages()
    {
        return [
            "PPDB_OPEN.required" => "Kolom PPDB OPEN wajib diisi",
            "PPDB_TAHUNAJARAN_ID.required" => "Kolom Tahun Ajaran wajib diisi",
            "PPDB_TAHUNAJARAN_ID.exists" => "Tahun Ajaran tidak valid",
        ];
    }
}
