import {Head} from "@inertiajs/react";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout.jsx";
import OptionElement from "@/Pages/Polls/Partials/OptionElement.jsx";



export default function Show({ poll }) {
    const {title, options} = poll;

    const voteCounts = options.map(option => {
        const count = poll.votes.filter(vote => vote.option_id === option.id).length;
        return {
            ...option, vote_count: count > 0 ? count : 0
        }
    });

    const totalVotes = poll.votes.length;


    return (
        <AuthenticatedLayout

        >
            <Head title={poll.title}/>

            <div className="max-w-lg mx-auto bg-white border rounded-lg shadow-md p-4">
                {/* Poll Title */}
                <h2 className="text-lg font-bold">{title}</h2>
                <p className="text-sm text-gray-500 hover:text-blue-400 mb-4" >
                    by {poll.user.name} · Posted on {new Date(poll.updated_at).toLocaleTimeString()}
                </p>

                {/* Poll Options */}
                {voteCounts.map((option, index) => (
                    <OptionElement key={option.id} option={option} totalVotes={totalVotes} pollId={poll.id} votes={poll.votes}/>
                ))}


            </div>


        </AuthenticatedLayout>
    )
}
