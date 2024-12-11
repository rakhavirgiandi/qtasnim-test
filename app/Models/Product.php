<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\HasMany;

class Product extends Model
{
    //
    protected $table = 'products';

    protected $fillable = ['name', 'price', 'price_currency', 'stock', 'description'];

    public function category(): BelongsTo
    {
        return $this->belongsTo(Category::class, 'category_id');
    }

    public function products(): HashMany
    {
        return $this->hasMany(Product::class, 'category_id');
    }
}
