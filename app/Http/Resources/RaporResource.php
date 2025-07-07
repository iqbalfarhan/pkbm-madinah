<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class RaporResource extends JsonResource
{
    /**
     * Transform the resource into an array.
     *
     * @return array<string, mixed>
     */
    public function toArray(Request $request): array
    {
        return [
            'id' => $this->id,
            'siswa' => $this->siswa->load('kelas'),
            'tahunajaran' => $this->tahunajaran,
            'jenis' => $this->jenis,
            'data' => $this->data,
            'pdf_path' => $this->pdf_path,
            'publish' => $this->publish,
            'created_at' => $this->created_at,
            'updated_at' => $this->updated_at,
        ];
    }
}
