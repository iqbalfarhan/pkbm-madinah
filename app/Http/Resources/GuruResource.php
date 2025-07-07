<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class GuruResource extends JsonResource
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
            "email" => $this->email,
            "avatar" => $this->avatar,
            "phone" => $this->phone,
            "gender" => $this->gender,
            "address" => $this->address,
            "nip" => $this->nip,
            "user" => $this->user,
            "walikelas" => $this->walikelas->load('tingkat'),
            "pelajarans" => PelajaranResource::collection($this->pelajarans),
        ];
    }
}
