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
                    return Poll::with(['options', 'votes', 'user', 'reactions'])
                        ->where('public', true) // Ensure the poll is public
                        ->where('created_at', '>=', Carbon::now()->subDays(7)) // Only polls from the last 7 days
                        ->withCount('reactions') // Count reactions for each poll
                        ->orderBy('reactions_count', 'desc') // Sort by most reactions
                        ->limit(5) // Get only the top 5
                        ->get();
                }
            ],
        ];
    }
}
