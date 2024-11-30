<?php

namespace App\Http\Controllers;

use App\Models\Reaction;
use Illuminate\Http\Request;

class ReactionController extends Controller
{
    public function upvote(Request $request) {
        $request->validate([
            'poll_id' => ['required', 'integer', 'exists:polls,id'],
        ]);


        $reaction = Reaction::where('user_id', auth()->id())
            ->where('poll_id', $request->poll_id)
            ->first();

        if (!$reaction) {
            Reaction::create([
                'user_id' => auth()->id(),
                'poll_id' => $request->poll_id,
                'type'=> 'upvote',
            ]);
        }

        else {
            if($reaction->type == 'upvote') {$reaction->delete();}
            else $reaction->update(['type'=> 'upvote']);
        }

    }

    public function downvote(Request $request) {
        $request->validate([
            'poll_id' => ['required', 'integer', 'exists:polls,id'],
        ]);

        $reaction = Reaction::where('user_id', auth()->id())
            ->where('poll_id', $request->poll_id)
            ->first();

        if(!$reaction) {
            Reaction::create([
                'user_id' => auth()->id(),
                'poll_id' => $request->poll_id,
                'type'=> 'downvote',
            ]);
        }

        else {
            if($reaction->type == 'downvote') {$reaction->delete();}
            else $reaction->update(['type'=> 'downvote']);
        }

    }
}
