<?php

namespace App\Http\Controllers;
use App\Http\Requests\StorePollRequest;
use App\Models\Poll;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Inertia\Inertia;
use Inertia\Response;

class PollController extends Controller
{

    public function index() : Response
    {
        return Inertia::render('Polls/Index');
    }

    public function fetchPosts(Request $request): JsonResponse
    {

        $request->validate([
            'limit'=> 'numeric|min:1',
            'offset'=> 'numeric|min:0'
        ]);


        $limit = $request->input('limit');
        $offset = $request->input('offset');

        $polls = Poll::with(['options', 'votes', 'user', 'reactions', 'bookmarks'])
            ->where('public', true)
            ->orderBy('created_at', 'desc')
            ->skip($offset)
            ->take($limit)
            ->get();

        return response()->json(['polls' => $polls]);
    }

    public function fetchSinglePoll(Poll $poll) : JsonResponse
    {
        $poll->load(['options', 'votes', 'user', 'reactions', 'bookmarks']);
        return response()->json(['poll' => $poll]);
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

        $poll = Poll::with(['options', 'votes', 'user', 'reactions', 'bookmarks'])->where('slug', $slug)->firstOrFail();
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

            $poll->update([
                'title' => $request->pollTitle,
                'public' => $request->privacy === "public",
            ]);

            $updatedOptions = collect($request->options);

            $existingOptions = $poll->options()->get()->keyBy('id');

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


    public function search(Request $request)
    {
        $query = $request->query('query', '');

        $polls = Poll::with(['options', 'votes', 'user', 'reactions', 'bookmarks'])->
            where('public', true)->
            where('title', 'like', '%'.$query.'%')->
            get();

        return Inertia::render('Polls/SearchResult', ['polls' => $polls ? $polls : [], 'query'=> $query]);
    }

}
