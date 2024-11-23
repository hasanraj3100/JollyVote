<?php

namespace App\Http\Controllers;

use App\Http\Requests\StorePollRequest;
use App\Models\Poll;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Inertia\Inertia;
use Inertia\Response;

class PollController extends Controller
{

    public function index() : Response
    {
        $polls = Poll::with('user')->with('options')->get();
        return Inertia::render('Polls/Index', ['polls' => $polls]);
    }


    public function create() : Response
    {
        return Inertia::render('Polls/Create');
    }


    public function store(StorePollRequest $request): RedirectResponse
    {
        DB::beginTransaction();
        try {
            $poll = Poll::create([
                'title'=>$request->pollTitle,
                'user_id'=> auth()->id()
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

    public function show(Poll $poll): Response
    {
        $poll->load('options')->load('user');
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


    public function rules() {

    }

}
