<?php

namespace App\Policies;

use App\Models\Poll;
use App\Models\User;
use Illuminate\Auth\Access\Response;

class PollPolicy
{
    public function edit(User $user, Poll $poll): bool {
        return $poll->user->is($user);
    }

}
