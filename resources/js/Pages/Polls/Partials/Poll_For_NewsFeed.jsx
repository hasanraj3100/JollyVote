import {Link, router} from "@inertiajs/react";
import OptionElement from "@/Pages/Polls/Partials/OptionElement.jsx";


export default function Poll_forNewsFeed({ poll }) {

    const {options} = poll;

    const voteCounts = options.map(option => {
        const count = poll.votes.filter(vote => vote.option_id === option.id).length;
        return {
            ...option, vote_count: count > 0 ? count : 0
        }
    });

    const totalVotes = poll.votes.length;
    const viewThePost = () => {
        router.visit(`polls/${poll.slug}` , {
            preserveScroll: true
        });
    }

    const viewTheAuthor = (e) => {
        e.stopPropagation();
        router.visit(`users/2`);
    }


    return (
        <div className="flex justify-center bg-gray-100">
            <div className="w-full max-w-2xl">
                <div
                    className="bg-white shadow-md rounded-lg p-6 mb-6 hover:bg-gray-100 hover:border-2 border-orange-600 transition duration-300">
                    <div className="flex items-center mb-4" onClick={viewThePost}>
                        <div className="ml-3">
                            <h2 className="text-xl font-semibold hover:text-blue-400">{poll.title}</h2>
                            <p
                                className="text-sm text-gray-500 hover:text-blue-400"
                                onClick={viewTheAuthor}
                            >
                                by {poll.user.name} · Posted on{' '}
                                {new Date(poll.updated_at).toLocaleTimeString()}
                            </p>
                        </div>
                    </div>

                    {voteCounts.map((option) => (
                        <OptionElement key={option.id} option={option} totalVotes={totalVotes} pollId={poll.id} votes={poll.votes}/>
                    ))}

                    <div
                        className="flex items-center justify-between border-t pt-4"
                        onClick={viewThePost}
                    >
                        <div className="flex items-center space-x-3 sm:space-x-6">
                            <button
                                className="flex items-center space-x-2 rounded-lg p-2 hover:shadow-lg hover:bg-green-100 transition duration-200">
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    className="h-6 w-6 text-green-500"
                                    fill="none"
                                    viewBox="0 0 24 24"
                                    stroke="currentColor"
                                >
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth="2"
                                        d="M5 15l7-7 7 7"
                                    ></path>
                                </svg>
                                <span className="font-medium text-gray-700 text-sm sm:inline-flex hidden sm:text-base">
                            Upvote
                        </span>
                                <span className="text-gray-500">(24)</span>
                            </button>

                            <button
                                className="flex items-center space-x-2 rounded-lg p-2 hover:shadow-lg hover:bg-red-100 transition duration-200">
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    className="h-6 w-6 text-red-500"
                                    fill="none"
                                    viewBox="0 0 24 24"
                                    stroke="currentColor"
                                >
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth="2"
                                        d="M19 9l-7 7-7-7"
                                    ></path>
                                </svg>
                                <span className="font-medium text-gray-700 text-sm sm:inline-flex hidden sm:text-base">
                            Downvote
                        </span>
                                <span className="text-gray-500">(3)</span>
                            </button>
                        </div>

                        <div className="flex items-center space-x-2">
                            <button className="flex items-center text-gray-500 hover:text-blue-500">
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    className="h-5 w-5 mr-1"
                                    fill="none"
                                    viewBox="0 0 24 24"
                                    stroke="currentColor"
                                >
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth="2"
                                        d="M17 8h2a2 2 0 012 2v9a2 2 0 01-2 2H5a2 2 0 01-2-2V10a2 2 0 012-2h2m2-2h6m-6 0a2 2 0 012-2h2a2 2 0 012 2m-4 14v-4m0 0H9m4 0h2"
                                    ></path>
                                </svg>
                                <span className="font-medium text-sm sm:inline-flex hidden sm:text-base">
                            Comments
                        </span>
                            </button>
                            <span className="text-gray-500">8</span>
                        </div>
                    </div>
                </div>
            </div>
        </div>

    );
}
