import {Link, router, usePage} from "@inertiajs/react";
import OptionElement from "@/Pages/Polls/Partials/OptionElement.jsx";


export default function Poll_forNewsFeed({poll}) {

    const {options} = poll;

    const voteCounts = options.map(option => {
        const count = poll.votes.filter(vote => vote.option_id === option.id).length;
        return {
            ...option, vote_count: count > 0 ? count : 0
        }
    });

    const totalVotes = poll.votes.length;
    const viewThePost = () => {
        router.visit(`polls/${poll.slug}`, {
            preserveScroll: true
        });
    }

    const viewTheAuthor = (e) => {
        e.stopPropagation();
        router.visit(`users/2`);
    }

    const upvote = (e) => {
        console.log("clicked");
        router.post('/upvote', {'poll_id': poll.id}, {
            onSuccess: (page) => {
                console.log("Upvoted casted");
            },
            onError: (errors) => {
                console.error('Error occured while upvoting: ', errors);
            },
            preserveScroll: true,
        });
    }

    const downvote = (e) => {
        router.post("/downvote", {'poll_id': poll.id}, {
            onSuccess: (page) => {
                console.log("Downvote Casted");
            },
            onError: (errors) => {
                console.error('Error occured while downvoting: ', errors);
            },
            preserveScroll: true
        });
    }




    const {auth} = usePage().props;
    const currentUserID = auth?.user?.id;
    const userReaction = poll.reactions.find(reaction => reaction.user_id === currentUserID)?.type;
    const upvoteCount = poll.reactions.filter(reaction => reaction.type === 'upvote').length;
    const downvoteCount = poll.reactions.filter(reaction => reaction.type === 'downvote').length;

    return (
        <div className="flex justify-center bg-gray-100">
            <div className="w-full max-w-2xl">
                <div
                    className="bg-white shadow-md rounded-lg p-6 mb-6 border-2 border-transparent hover:bg-gray-100 hover:border-gray-600 transition duration-100">
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
                        <OptionElement key={option.id} option={option} totalVotes={totalVotes} pollId={poll.id}
                                       votes={poll.votes}/>
                    ))}

                    <div
                        className="flex items-center justify-between border-t pt-4"

                    >
                        <div className="flex items-center space-x-3 sm:space-x-6">
                            <button
                                className={`flex items-center space-x-2 rounded-lg p-2 transition duration-200 ${
                                    userReaction === 'upvote'
                                        ? 'bg-green-100 shadow-lg'
                                        : 'hover:shadow-lg hover:bg-green-100'
                                }`}
                                onClick={upvote}
                            >
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    className={`h-6 w-6 ${
                                        userReaction === 'upvote' ? 'text-green-700' : 'text-green-500'
                                    }`}
                                    fill={userReaction === 'upvote' ? 'currentColor' : 'none'}
                                    viewBox="0 0 24 24"
                                    stroke={userReaction === 'upvote' ? 'none' : 'currentColor'}
                                >
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth="2"
                                        d="M5 15l7-7 7 7"
                                    ></path>
                                </svg>
                                <span
                                    className={`font-medium text-sm sm:inline-flex hidden sm:text-base ${
                                        userReaction === 'upvote' ? 'text-green-700' : 'text-gray-700'
                                    }`}
                                >
                                    Upvote
                                </span>
                                <span
                                    className={`${
                                        userReaction === 'upvote' ? 'text-green-600' : 'text-gray-500'
                                    }`}
                                >
                                    ({upvoteCount})
                                </span>
                            </button>


                            <button
                                className={`flex items-center space-x-2 rounded-lg p-2 transition duration-200 ${
                                    userReaction === 'downvote'
                                        ? 'bg-red-100 shadow-lg'
                                        : 'hover:shadow-lg hover:bg-red-100'
                                }`}
                                onClick={downvote}
                            >
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    className={`h-6 w-6 ${
                                        userReaction === 'downvote' ? 'text-red-700' : 'text-red-500'
                                    }`}
                                    fill={userReaction === 'downvote' ? 'currentColor' : 'none'}
                                    viewBox="0 0 24 24"
                                    stroke={userReaction === 'downvote' ? 'none' : 'currentColor'}
                                >
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth="2"
                                        d="M19 9l-7 7-7-7"
                                    ></path>
                                </svg>
                                <span
                                    className={`font-medium text-sm sm:inline-flex hidden sm:text-base ${
                                        userReaction === 'downvote' ? 'text-red-700' : 'text-gray-700'
                                    }`}
                                >
                                    Downvote
                                </span>
                                <span
                                    className={`${
                                        userReaction === 'downvote' ? 'text-red-600' : 'text-gray-500'
                                    }`}
                                >
                                    ({downvoteCount})
                                </span>
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
                            <span className="text-gray-500">0</span>
                        </div>
                    </div>
                </div>
            </div>
        </div>

    );
}
