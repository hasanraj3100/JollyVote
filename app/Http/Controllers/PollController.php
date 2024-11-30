<?php

namespace App\Http\Controllers;

use App\Http\Requests\StorePollRequest;
use App\Http\Requests\UpdatePollRequest;
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
        $polls = Poll::with(['options', 'votes', 'user', 'reactions'])
        ->where('public', true)
        ->orderBy('created_at', 'desc')
        ->get();

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

        return Inertia::render('Polls/Show', ['poll' => $poll]);
    }

    public function edit(Poll $poll): Response
    {
        $poll->load(['options']);
        return Inertia::render('Polls/Edit', ['poll' => $poll]);
    }


    public function update(StorePollRequest $request, Poll $poll): RedirectResponse
    {
        DB::beginTransaction();
        try {
            // Update the poll details

            $poll->update([
                'title' => $request->pollTitle,
                'public' => $request->privacy === "public",
            ]);

            // Synchronize the poll options
            $updatedOptions = collect($request->options);




            // Get current options and their IDs
            $existingOptions = $poll->options()->get()->keyBy('id');



            // Update existing options and track which IDs to retain
            $retainOptionIds = [];
            foreach ($updatedOptions as $option) {
                if (isset($option['id']) && $existingOptions->has($option['id'])) {
                    // Update existing option
                    $existingOptions[$option['id']]->update([
                        'title' => $option['title'],
                    ]);
                    $retainOptionIds[] = $option['id'];
                } else {
                    // Add new option
                    $newOption = $poll->options()->create(['title' => $option['title']]);
                    $retainOptionIds[] = $newOption->id;
                }
            }

            // Delete options not included in the request
            $poll->options()
                ->whereNotIn('id', $retainOptionIds)
                ->delete();

            DB::commit();



            return redirect('/polls')->with('success', 'Poll updated successfully.');
        } catch (\Exception $e) {
            DB::rollBack();
            dd($e->getMessage());
        }
    }


    public function destroy(Poll $poll)
    {
        //
    }



}
