<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class Option extends Model
{
    /** @use HasFactory<\Database\Factories\OptionFactory> */
    use HasFactory;


    protected $fillable = ['title', 'vote_count'];

    public function poll(): BelongsTo {
        return $this->belongsTo(Poll::class);
    }
}
