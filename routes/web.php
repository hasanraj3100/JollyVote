<?php

use App\Http\Controllers\PollController;
use App\Http\Controllers\ProfileController;
use Illuminate\Foundation\Application;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

Route::get('/', function () {
    if(\Illuminate\Support\Facades\Auth::check()) {
        return redirect()->route('polls.index');
    }
    return Inertia::render('Welcome', [
        'canLogin' => Route::has('login'),
        'canRegister' => Route::has('register'),
        'laravelVersion' => Application::VERSION,
        'phpVersion' => PHP_VERSION,
    ]);
})->name('guest.home');

Route::get('/dashboard', function () {
    return redirect()->route('polls.index');
})->middleware(['auth', 'verified'])->name('dashboard');

Route::middleware('auth')->group(function () {

    Route::get('/api/polls', [PollController::class, 'fetchPosts'])->name('polls.fetch');

    Route::get('/polls', [PollController::class, 'index'])->name('polls.index');
    Route::get('/polls/create', [PollController::class, 'create'])->name('polls.create');
    Route::post('/polls', [PollController::class, 'store'])->name('polls.store');
    Route::get('/polls/edit/{poll}', [PollController::class, 'edit'])->name('polls.edit');
    Route::patch('/polls/{poll}', [PollController::class, 'update'])->name('polls.update');
    Route::get('/polls/{slug}', [PollController::class, 'show'])->name('polls.show');

    Route::post('/vote', [\App\Http\Controllers\VoteController::class, 'castVote']);

    Route::get('/search', [PollController::class, 'search'])->name('polls.search');

    Route::post('/upvote', [\App\Http\Controllers\ReactionController::class, 'upvote']);
    Route::post('/downvote', [\App\Http\Controllers\ReactionController::class, 'downvote']);


    Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
    Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');
});

require __DIR__.'/auth.php';
