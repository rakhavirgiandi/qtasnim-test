<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\HasMany;
use Illuminate\Database\Eloquent\Casts\Attribute;

class Product extends Model
{
    //
    protected $table = 'products';

    protected $fillable = ['name', 'price', 'price_currency', 'stock', 'description'];

    protected $appends = ['full_price'];

    protected $casts = [
        'price' => 'integer',
    ];

    function currencyformat($number) {
        return "Rp. " . number_format($number, 0, ',', '.');
    }

    public function category(): BelongsTo
    {
        return $this->belongsTo(Category::class, 'category_id');
    }

    public function Orders(): HashMany
    {
        return $this->hasMany(Order::class, 'product_id');
    }

    protected function fullPrice(): Attribute {
        return new Attribute(
            get: function (mixed $value, array $attributes)  {
                return $this->currencyformat($this->price);
            }
        );
    }
}
