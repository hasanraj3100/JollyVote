import {useForm, usePage} from "@inertiajs/react";

export default function OptionElement({option , totalVotes, pollId, votes}) {
    const { data, setData, post, processing, errors} = useForm({
        'poll_id': pollId,
        'option_id': option.id
    });
    const castVote = () => {
        console.log("click");

        post('/vote', {
            preserveScroll: true
        });
    }

    const {auth} = usePage().props;
    const currentUserID = auth?.user?.id;
    const userVote = (votes.find(vote=> vote.user_id === currentUserID))?.option_id;
    
    return (
        <div
            key={option.id}
            className={`flex items-center mb-4 p-2 rounded-lg ${
                userVote === option.id
                    ? 'border-2 border-green-500 bg-green-50 shadow-md'
                    : 'border border-gray-200'
            } transition duration-300`}
            onClick={castVote}
        >
            {/* Checkmark */}
            <div
                className={`flex items-center justify-center w-6 h-6 rounded-full border-2 ${
                    userVote === option.id
                        ? 'border-green-500 bg-green-500 text-white'
                        : 'border-gray-300'
                }`}
            >
                {userVote === option.id && (
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-4 w-4"
                        viewBox="0 0 20 20"
                        fill="currentColor"
                    >
                        <path
                            fillRule="evenodd"
                            d="M16.707 5.293a1 1 0 010 1.414L8.414 15l-3.707-3.707a1 1 0 111.414-1.414L8.414 12.586l7.293-7.293a1 1 0 011.414 0z"
                            clipRule="evenodd"
                        />
                    </svg>
                )}
            </div>

            {/* Option Text and Bar */}
            <div className="ml-3 w-full" >
                <p className="font-medium text-gray-700">
                    {option.title}
                </p>
                <div className="relative w-full h-4 bg-gray-200 rounded-md overflow-hidden mt-1">
                    <div
                        className={`h-full ${
                            userVote === option.id
                                ? 'bg-green-500'
                                : 'bg-blue-500'
                        }`}
                        style={{
                            width: option.vote_count > 0 ? `${(option.vote_count / totalVotes) * 100}%` : 0,
                        }}
                    ></div>
                </div>
                <p className="text-sm text-gray-500 mt-1">
                    {option.vote_count} votes
                </p>
            </div>
        </div>
    )
}
