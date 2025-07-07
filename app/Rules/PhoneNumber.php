<?php

namespace App\Rules;

use Closure;
use Illuminate\Contracts\Validation\ValidationRule;
use function PHPUnit\Framework\isNull;

class PhoneNumber implements ValidationRule
{
    /**
     * Run the validation rule.
     *
     * @param  \Closure(string, ?string=): \Illuminate\Translation\PotentiallyTranslatedString  $fail
     */
    public function validate(string $attribute, mixed $value, Closure $fail): void
    {
        if (is_null($value) || $value === '') {
            return;
        }

        if (!preg_match('/^\+62\d{8,11}$/', $value)) {
            $fail("Format $attribute tidak valid. Gunakan format +62xxxxxxxxxxx.");
        }
    }
}
