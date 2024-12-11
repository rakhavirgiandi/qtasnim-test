<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\HasMany;
class Category extends Model
{
    //
    protected $table = 'categories';

    protected $fillable = ['key', 'title'];
    public function products(): HashMany
    {
        return $this->hasMany(Product::class, 'category_id');
    }
}
