<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class KetidakhadiranResource extends JsonResource
{
    /**
     * Transform the resource into an array.
     *
     * @return array<string, mixed>
     */
    public function toArray(Request $request): array
    {
        return [
            "id" => $this->id,
            "tahunajaran" => $this->tahunajaran,
            "siswa" => $this->siswa,
            "date" => $this->date->format('d F Y'),
            "reason" => $this->reason,
        ];
    }
}
