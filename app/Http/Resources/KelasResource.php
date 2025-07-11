<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class KelasResource extends JsonResource
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
            "name" => $this->name,
            "tingkat" => $this->tingkat,
            "walikelas" => $this->walikelas,
            "description" => $this->description ?? "",
            "siswas" => $this->siswas->load('ekskuls', 'orangtua', 'ketidakhadirans'),
            "pelajarans" => $this->pelajarans->load('mapel', 'guru'),
        ];
    }
}
