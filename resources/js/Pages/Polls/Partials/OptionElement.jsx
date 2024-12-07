import {useForm, usePage} from "@inertiajs/react";

export default function OptionElement({option, totalVotes, pollId, votes}) {
    const {data, setData, post, processing, errors} = useForm({
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
    const userVote = (votes.find(vote => vote.user_id === currentUserID))?.option_id;

    return (

        <div className="flex items-center" onClick={castVote}>
            <div
                className={`flex items-center justify-center w-6 h-6 rounded-full border-2 border-gray-300 ${userVote === option.id? 'bg-sky-500' : ''}`}
            >
                {userVote === option.id && (
                    <ion-icon name="checkmark" className="text-xl text-white font-bold"></ion-icon>
                )}

            </div>
            <div className="block ml-3 mt-4 w-full">
                <div className="flex mb-4 relative">
                    <div
                        className="absolute top-0 left-0 w-full flex justify-between px-4 py-1"
                    >
                        <div>{option.title}</div>
                        <span>{option.vote_count}</span>
                    </div>
                    <div className="poll-bar bg-sky-50 rounded h-8 w-full">
                        <div
                            className="poll-bar-fill bg-sky-500 h-8 rounded bg-gradient-to-r from-sky-500 to-sky-200"
                            style={{width: option.vote_count > 0 ? `${(option.vote_count / totalVotes) * 100}%` : 0,}}
                        ></div>
                    </div>
                </div>
            </div>
        </div>
    )
}

