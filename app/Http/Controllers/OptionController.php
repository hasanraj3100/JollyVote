<?php

namespace App\Http\Controllers;

use App\Models\Option;
use Illuminate\Http\Request;

class OptionController extends Controller
{
    public function castVote(Request $request): void {
        $option = Option::find($request->id);

        if($option) $option->increment('vote_count', 1);
    }
}
