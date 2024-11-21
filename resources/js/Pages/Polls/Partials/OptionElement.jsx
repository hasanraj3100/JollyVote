import {useForm} from "@inertiajs/react";

export default function OptionElement({option , totalVotes}) {


    const { data, setData, post, processing, errors} = useForm({
        'id': option.id
    });
    const castVote = () => {
        console.log("click");

        post('/vote');
    }
    return (
        <div className="mb-3">
            {/* Option Progress Bar */}
            <div className="flex items-center justify-between">
                <h3 className="text-gray-700 font-medium mb-2" onClick={castVote}>{option.title}</h3>
                <span className="text-sm font-medium">{option.vote_count} votes</span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-4 mt-1" onClick={castVote}>
                <div
                    className="bg-blue-500 h-4 rounded-full"
                    style={{
                        width: totalVotes
                            ? `${((option.vote_count / totalVotes) * 100).toFixed(2)}%`
                            : "0%",
                    }}
                ></div>
            </div>
        </div>
    )
}
