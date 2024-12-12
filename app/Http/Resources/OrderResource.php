<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class OrderResource extends JsonResource
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
            'order_date' => $this->order_date,
            'previous_stock' => $this->previous_stock,
            'order_amount' => $this->order_amount,
            'remaining_stock' => $this->remaining_stock,
            'created_at' => $this->created_at,
            "product" => $this->when($this->product_id, [
                'name' => $this->product_name,
                'id' => $this->product_id,
                'price' => $this->product_price,
                'price_currency' => $this->product_price_currency,
                'stock' => $this->product_stock,
                'category' => $this->when($this->product_category_id, [
                    'id' => $this->product_category_id,
                    'key' => $this->product_category_key,
                    'title' => $this->product_category_title,
                ])
            ])
        ];
    }
}
