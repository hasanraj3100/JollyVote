<?php

namespace App\Http\Controllers;

use App\Http\Requests\StorePollRequest;
use App\Models\Option;
use App\Models\Poll;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Str;
use Inertia\Inertia;
use Inertia\Response;

class PollController extends Controller
{

    public function index() : Response
    {


        $polls = Poll::with(['options', 'votes', 'user'])
        ->where('public', true)->get();

        foreach($polls as $poll) {
            foreach($poll->options as $option) {
                $option->vote_count = $option->votes->count();
            }
        }




        return Inertia::render('Polls/Index', ['polls' => $polls ? $polls : []]);
    }


    public function create() : Response
    {
        return Inertia::render('Polls/Create');
    }


    public function store(StorePollRequest $request): RedirectResponse
    {
        DB::beginTransaction();
        try {

            $is_public = $request->privacy === "public";

            $poll = Poll::create([
                'slug' => Poll::generateSlug($request->pollTitle),
                'title'=>$request->pollTitle,
                'user_id'=> auth()->id(),
                'public' => $is_public,
            ]);


            $poll->options()->createMany(
                array_map( fn($option)=> ['title'=> $option['title']], $request->options)
            );

            DB::commit();

            return redirect('/polls');
        }
        catch (\Exception $e)
        {
            DB::rollBack();
            dd($e->getMessage());
        }

    }


    public function show($slug): Response
    {

        $poll = Poll::with(['options', 'votes', 'user'])->where('slug', $slug)->firstOrFail();

        foreach($poll->options as $option) {
            $option->vote_count = $option->votes->count();
        }

        return Inertia::render('Polls/Show', ['poll' => $poll]);
    }

    public function edit(Poll $poll)
    {
        //
    }


    public function update(Request $request, Poll $poll)
    {
        //
    }

    public function destroy(Poll $poll)
    {
        //
    }



}
