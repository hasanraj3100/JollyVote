<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class Reaction extends Model
{
    /** @use HasFactory<\Database\Factories\ReactionFactory> */
    use HasFactory;

    protected $guarded = [];

    public function poll():BelongsTo {
        return $this->belongsTo(Poll::class);
    }

    public function user():BelongsTo {
        return $this->belongsTo(User::class);
    }
}
