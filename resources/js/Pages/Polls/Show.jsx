import {Head} from "@inertiajs/react";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout.jsx";
import OptionElement from "@/Pages/Polls/Partials/OptionElement.jsx";



export default function Show({ poll }) {
    const {title, options} = poll;

    const totalVotes = options.reduce((sum, option) => sum + option.vote_count, 0);


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
                {poll.options.map((option, index) => (
                    <OptionElement key={option.id} option={option} totalVotes={totalVotes} pollId={poll.id}/>
                ))}


            </div>


        </AuthenticatedLayout>
    )
}
