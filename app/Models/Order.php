<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Casts\Attribute;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class Order extends Model
{
    //
    protected $table = 'orders';

    protected $fillable = ['previous_stock', 'order_amount', 'order_date'];

    public function product(): BelongsTo
    {
        return $this->belongsTo(Product::class, 'product_id');
    }

    protected function remainingStock(): Attribute
    {   
        $previous_stock = (int) $this->previous_stock;
        $order_amount = (int) $this->order_amount;

        return Attribute::make(
            get: function () use ($previous_stock, $order_amount) {
                if ($previous_stock && $order_amount) {
                    return $previous_stock - $order_amount; 
                }

                return 0;
            },
        );
    }

}
