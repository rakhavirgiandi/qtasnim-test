<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class ProductResource extends JsonResource
{
    /**
     * Transform the resource into an array.
     *
     * @return array<string, mixed>
     */
    public function toArray(Request $request): array
    {
        // return parent::toArray($request);
        return [
            'id' => $this->id,
            'name' => $this->name,
            'price' => $this->price,
            'price_currency' => $this->price_currency,
            'full_price' => $this->full_price,
            'stock' => $this->stock,
            'description' => $this->description,
            'created_at' => $this->created_at,
            'category' => [
                'id' => $this->category_id,
                'key' => $this->category_key,
                'title' => $this->category_title,
            ]
        ];
    }
    
}
