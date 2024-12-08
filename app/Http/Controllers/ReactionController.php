<?php

namespace App\Http\Controllers;

use App\Models\Reaction;
use Illuminate\Http\Request;

class ReactionController extends Controller
{

    public function react(Request $request)
    {
        $request->validate([
            'poll_id' => ['required', 'exists:polls,id'],
        ]);

        $reaction = Reaction::where('user_id', auth()->id())
            ->where('poll_id', $request->poll_id)
            ->first();

        if(!$reaction)
        {
            Reaction::create([
                'user_id' => auth()->id(),
                'poll_id' => $request->poll_id
            ]);
        }

        else
        {
            $reaction->delete();
        }
    }

}
