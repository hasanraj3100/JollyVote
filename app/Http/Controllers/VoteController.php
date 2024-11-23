<?php

namespace App\Http\Controllers;

use App\Models\Option;
use App\Models\Vote;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Inertia\Response;

class VoteController extends Controller
{
    public function castVote(Request $request): void
    {
        $request->validate([
            'poll_id' => ['required', 'exists:polls,id'],
            'option_id' => ['required', 'exists:options,id'],
        ]);

        $option = Option::find($request->option_id);

        $vote = Vote::where('user_id', auth()->id())
            ->where('poll_id', $request->poll_id)
            ->first();

        if ($vote) {
            if($vote->option_id != $option->id) {
                $vote->update(['option_id' => $option->id]);
            }
            else {
                $vote->delete();
            }
        } else {
            Vote::create([
                'user_id' => auth()->id(),
                'option_id' => $option->id,
                'poll_id' => $request->poll_id
            ]);
        }

    }


    public function undovote(Request $request): void
    {
        Vote::where('poll_id', $request['poll_id'])
            ->where('user_id', auth()->id())
            ->delete();
    }
}
