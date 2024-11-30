<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\HasMany;
use Illuminate\Support\Str;
use Inertia\Inertia;
use Inertia\Response;

class Poll extends Model
{
    /** @use HasFactory<\Database\Factories\PollFactory> */
    use HasFactory;

    protected $fillable = ['title', 'user_id', 'slug', 'public', 'created_at', 'updated_at'];

    public function user():BelongsTo {
        return $this->belongsTo(User::class);
    }

    public function options():HasMany {
        return $this->hasMany(Option::class);
    }

    public function votes(): HasMany
    {
        return $this->hasMany(Vote::class);
    }

    public function reactions(): HasMany {
        return $this->hasMany(Reaction::class);
    }

    public static function generateSlug($title) {
        $slug = Str::slug($title);
        $originalSlug = $slug;
        $count = 1;

        while(self::where('slug', $slug)->exists()) {
            $slug = $originalSlug . '-' . $count++;
        }

        return $slug;
    }
}
