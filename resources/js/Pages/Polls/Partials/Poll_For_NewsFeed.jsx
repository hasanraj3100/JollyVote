import {Link, router, usePage} from "@inertiajs/react";
import OptionElement from "@/Pages/Polls/Partials/OptionElement.jsx";
import {Button} from "@headlessui/react";
import NiceDateTime from "@/Components/NiceDateTime.jsx";
import UserAvatar from "@/Components/UserAvatar.jsx";


export default function Poll_forNewsFeed({poll, singleView=false, setModalOpen=null,
                                             onChange = null}) {

    const currentUserID = usePage().props.auth.user.id;

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

    const handleReact = (e) => {
        router.post(route('polls.react'), {'poll_id': poll.id}, {
            preserveScroll: true,
            onSuccess: () => {
                if(onChange) onChange(poll.id);
            }
        })
    };

    const handleEdit = (e) => {
        router.visit(route('polls.edit', poll.id));
    }

    const handleModal = () => {
        if(setModalOpen)
        setModalOpen(o => !o);
    }

    const handleAddBookmark = () => {
        router.post(route('bookmarks.add'), {'poll_id': poll.id}, {
            preserveScroll:true,
            onSuccess: () => {
                if(onChange) onChange(poll.id);
            }
        })
    }

    const userReaction = !!poll.reactions.find(reaction => reaction.user_id === currentUserID);

    const reactionCount = poll.reactions.length;
    const isBookmarked = !!poll.bookmarks.find(bookmark=> bookmark.user_id === currentUserID);

    return (
        <div className={'bg-white shadow-lg rounded px-8 m-1'}>
            <div className={'flex itemss-center mb-4 py-6'}>
                <UserAvatar name={poll.user.name}/>
                <div>
                    <h3 className={'text-lg font-bold'}>{poll.user.name}</h3>
                    <span className={'text-sm text-gray-500 hover:text-blue-500'}>@{poll.user.name}</span>
                </div>
                <div className={'flex space-x-4 items-center ml-auto'}>
                    <span className={'text-sm text-gray-500 ml-auto'}><NiceDateTime dateString={poll.updated_at}/></span>
                    <Button className={'flex items-center text-gray-500 text-lg hover:bg-gray-200 hover:font-bold'} onClick={handleAddBookmark}>
                        <ion-icon name={isBookmarked ? 'bookmark' : 'bookmark-outline'}></ion-icon>

                    </Button>

                    {poll.user.id === currentUserID && (
                        <Button className={'flex items-center text-gray-500 text-lg'}
                        onClick={handleEdit}>
                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24" fill="none"
                                 stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
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
                    <OptionElement key={option.id} option={option} pollId={poll.id} totalVotes={totalVotes} votes={poll.votes} onVote={onChange}/>
                ))}

            </div>

            <div className="text-sm text-gray-500 mb-4">{totalVotes} votes • 7 Days Left</div>

            <div className="flex text-2xl items-center border-t">
                <button
                    className={`text-gray-700 w-full h-12 hover:bg-sky-100 flex justify-center items-center space-x-2
                    ${userReaction ? 'text-red-600' : ''}`}
                    onClick={handleReact}
                >
                    <ion-icon name={`${userReaction ? 'heart' : 'heart-outline'}`}></ion-icon>
                    <span className="text-sm">{reactionCount}</span>
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
