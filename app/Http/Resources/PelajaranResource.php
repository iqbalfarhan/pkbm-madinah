<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class PelajaranResource extends JsonResource
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
            'guru_id' => $this->guru_id,
            'mapel_id' => $this->mapel_id,
            'kelas_id' => $this->kelas_id,
            'guru' => $this->guru,
            'mapel' => $this->mapel->load('mapelGroup', 'tingkat'),
            'kelas' => $this->kelas,
            'tahunajaran' => $this->tahunajaran,
        ];
    }
}
