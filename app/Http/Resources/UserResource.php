<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class UserResource extends JsonResource
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
            'name' => $this->name,
            'email' => $this->email,
            'last_login' => $this->last_login,
            'password' => $this->password,
            'photo' => $this->photo,
            'roles' => $this->getRoleNames(),
            'siswas' => $this->siswas,
            'guru' => $this->guru,
            'avatar' => $this->avatar,
        ];
    }
}
