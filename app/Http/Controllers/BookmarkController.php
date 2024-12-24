<?php

namespace App\Http\Controllers;

use App\Models\Bookmark;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\DB;
use Inertia\Inertia;

class BookmarkController extends Controller
{
    public function index() {
        $user = Auth::user();
        $bookmarks = $user->bookmarks()->with(['poll' => function ($query) {
            $query->with(['options', 'user', 'reactions', 'votes', 'bookmarks']);
        }])->get();

        return Inertia::render('Bookmarks/Index', ['bookmarks' => $bookmarks]);
    }

    public function add(Request $request) {
        $request->validate([
            'poll_id' => 'required|integer|exists:polls,id',
        ]);

        $user = Auth::user();

        $bookmark = Bookmark::where('poll_id', $request->poll_id)
            ->where('user_id', $user->id)
            ->first();

        DB::beginTransaction();

        if(!$bookmark) {
            Bookmark::create([
                'user_id' => $user->id,
                'poll_id' => $request->poll_id
            ]);
        }
        else {
            $bookmark->delete();
        }

        DB::commit();

    }
}
