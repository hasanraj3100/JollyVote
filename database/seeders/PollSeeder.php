<?php

namespace Database\Seeders;

use App\Models\Option;
use App\Models\Poll;
use App\Models\User;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class PollSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $numberOfPolls= 10;

        $users = User::all();

        for($i = 0; $i < $numberOfPolls; $i++){
            $user = $users->random();
            $poll = Poll::create([
                'user_id' => $user->id,
                'title' => 'Poll ' . ($i + 20) . ' , ' . fake()->sentence(4),
                'slug' => 'poll-' . ($i + 20),
                'public' => true,
            ]);

            $numberOfOptions = rand(2, 5);

            for($j = 0; $j < $numberOfOptions; $j++){
                Option::create([
                    'poll_id' => $poll->id,
                    'title'=> fake()->word(),
                ]);
            }

        }
    }
}
