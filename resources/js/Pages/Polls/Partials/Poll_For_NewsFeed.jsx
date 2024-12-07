import {Link, router, usePage} from "@inertiajs/react";
import OptionElement from "@/Pages/Polls/Partials/OptionElement.jsx";
import {Button} from "@headlessui/react";


export default function Poll_forNewsFeed({poll, singleView=false, setModalOpen=null}) {

    const {options} = poll;

    const voteCounts = options.map(option => {
        const count = poll.votes.filter(vote => vote.option_id === option.id).length;
        return {
            ...option, vote_count: count > 0 ? count : 0
        }
    });

    const totalVotes = poll.votes.length;
    const viewThePost = () => {
        router.visit(route('polls.show', poll.slug), {
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

    const handleEdit = (e) => {
        router.visit(route('polls.edit', poll.id));
    }

    const handleModal = () => {
        if(setModalOpen)
        setModalOpen(o => !o);
    }


    const formatPostDate = (dateString) => {
        const postDate = new Date(dateString);
        const now = new Date();
        const diffInSeconds = Math.floor((now - postDate) / 1000);

        if (diffInSeconds < 60) {
            return 'Just now';
        } else if (diffInSeconds < 3600) {
            const minutes = Math.floor(diffInSeconds / 60);
            return `${minutes} minute${minutes > 1 ? 's' : ''} ago`;
        } else if (diffInSeconds < 86400) {
            const hours = Math.floor(diffInSeconds / 3600);
            return `${hours} hour${hours > 1 ? 's' : ''} ago`;
        } else if (diffInSeconds < 172800) {
            return 'Yesterday';
        } else if (diffInSeconds < 604800) {
            const days = Math.floor(diffInSeconds / 86400);
            return `${days} day${days > 1 ? 's' : ''} ago`;
        } else {
            return postDate.toLocaleString('en-US', {
                month: 'short',
                day: 'numeric',
                year: now.getFullYear() === postDate.getFullYear() ? undefined : 'numeric',
                hour: '2-digit',
                minute: '2-digit',
            });
        }
    }


    const {auth} = usePage().props;
    const currentUserID = auth?.user?.id;
    const userReaction = poll.reactions.find(reaction => reaction.user_id === currentUserID)?.type;
    const upvoteCount = poll.reactions.filter(reaction => reaction.type === 'upvote').length;
    const downvoteCount = poll.reactions.filter(reaction => reaction.type === 'downvote').length;

    return (
        <div className={'bg-white shadow-lg rounded px-8 m-1'}>
            <div className={'flex itemss-center mb-4 py-6'}>
                <img
                    src={'https://via.placeholder.com/40'}
                    alt={`${poll.user.name} avatar`}
                    className={'w-12 h-12 rounded-full mr-4'}
                />
                <div>
                    <h3 className={'text-lg font-bold'}>{poll.user.name}</h3>
                    <span className={'text-sm text-gray-500 hover:text-blue-500'}>@{poll.user.name}</span>
                </div>
                <div className={'flex space-x-4 items-center ml-auto'}>
                    <span className={'text-sm text-gray-500 ml-auto'}>{formatPostDate(poll.updated_at)}</span>
                    <Button className={'flex items-center text-gray-500 text-lg'}>
                        <ion-icon name={'bookmark-outline'}></ion-icon>
                    </Button>

                    {poll.user.id === currentUserID && (
                        <Button className={'flex items-center text-gray-500 text-lg'}
                        onClick={handleEdit}>
                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24" fill="none"
                                 stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                                <path d="M17.5 2.5l4.5 4.5-12 12H6v-5l12-12z"></path>
                            </svg>
                        </Button>
                    )}

                </div>
            </div>

            <p className={'text-lg mb-4'}>
                {poll.title}
            </p>

            <div className="poll-container">

                {voteCounts.map(option => (
                    <OptionElement option={option} pollId={poll.id} totalVotes={totalVotes} votes={poll.votes}/>
                ))}

            </div>

            <div className="text-sm text-gray-500 mb-4">{totalVotes} votes • 7 Days Left</div>

            <div className="flex text-2xl items-center border-t">
                <button
                    className={`text-gray-700 w-full h-12 hover:bg-sky-100 flex justify-center items-center space-x-2
                    ${userReaction === 'upvote' ? 'text-red-600' : ''}`}
                    onClick={upvote}
                >
                    <ion-icon name={`${userReaction === 'upvote' ? 'heart' : 'heart-outline'}`}></ion-icon>
                    <span className="text-sm">{upvoteCount}</span>
                </button>
                <button
                    className="text-gray-700 mr-4 h-12 w-full hover:bg-sky-100 flex justify-center items-center space-x-2"
                    onClick={viewThePost}
                >
                    <ion-icon name="chatbox-ellipses-outline"></ion-icon>
                    <span className="text-sm">0</span>
                </button>
                <button className="text-gray-700 mr-4 h-12 w-full hover:bg-sky-100"
                        onClick={singleView ? handleModal : viewThePost}
                >
                    <ion-icon name="stats-chart-outline"></ion-icon>
                </button>
            </div>

        </div>

    );
}
