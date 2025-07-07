<?php

namespace App\Rules;

use Closure;
use Illuminate\Contracts\Validation\ValidationRule;

class GenderIn implements ValidationRule
{
    /**
     * Run the validation rule.
     *
     * @param  \Closure(string, ?string=): \Illuminate\Translation\PotentiallyTranslatedString  $fail
     */
    public function validate(string $attribute, mixed $value, Closure $fail): void
    {
        // Kalau null atau kosong, jangan divalidasi (biarin nullable bekerja)
        if (is_null($value) || $value === '') {
            return;
        }

        if (!in_array($value, ['Laki-laki', 'Perempuan'])) {
            $fail('Jenis kelamin tidak valid');
        }
    }
}
