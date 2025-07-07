<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class SiswaResource extends JsonResource
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
            'nisn' => $this->nisn,
            'name' => $this->name,
            'gender' => $this->gender,
            'ttl' => $this->ttl,
            'kelas' => $this->kelas,
            'umur' => $this->umur,
            'status' => $this->status,
            'avatar' => $this->avatar,
            'orangtua' => $this->orangtua,
            'ekskuls' => $this->ekskuls,
            'rapors' => $this->rapors,
            'asalsekolah' => $this->asalsekolah,
            'user' => $this->user,
            'media' => $this->getMedia("*"),
        ];
    }
}
