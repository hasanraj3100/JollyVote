<?php

namespace App\Http\Middleware;

use App\Models\Poll;
use Carbon\Carbon;
use Illuminate\Http\Request;
use Inertia\Middleware;

class HandleInertiaRequests extends Middleware
{
    /**
     * The root template that is loaded on the first page visit.
     *
     * @var string
     */
    protected $rootView = 'app';

    /**
     * Determine the current asset version.
     */
    public function version(Request $request): ?string
    {
        return parent::version($request);
    }

    /**
     * Define the props that are shared by default.
     *
     * @return array<string, mixed>
     */
    public function share(Request $request): array
    {
        return [
            ...parent::share($request),
            'auth' => [
                'user' => $request->user(),
                'trendingPolls'=> function () {
                    return Poll::withCount(['votes as recent_votes_count' => function ($query) {
                        $query->where('public', true)->where('created_at', '>=', Carbon::now()->subWeek());
                    }])->orderBy('created_at', 'desc')->take(5)->get();
                }
            ],
        ];
    }
}
