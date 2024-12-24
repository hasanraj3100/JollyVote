import {Head, router, usePage} from "@inertiajs/react";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout.jsx";
import Poll_forNewsFeed from "@/Pages/Polls/Partials/Poll_For_NewsFeed.jsx";
import CategoryButton from "@/Components/CategoryButton.jsx";
import {useCallback, useEffect, useState} from "react";
import {useInView} from "react-intersection-observer";
import SmallHeaderPanel from "@/Components/SmallHeaderPanel.jsx";

export default function Index() {
    const currentUserID = usePage().props.auth.user.id;
    const [currentPolls, setCurrentPolls] = useState([]);
    const [loading, setLoading] = useState(false);
    const [hasMore, setHasMore] = useState(true);
    const [offset, setOffset] = useState(0);
    const limit = 15;

    //When user casts a vote or reacts, it fetches that poll again.
    const handleChange = async (pollId) => {
        try {
            const response = await axios.get(route('polls.fetchSingle', pollId));
            const newPoll = response.data.poll;


            setCurrentPolls( (prevPolls) =>
                prevPolls.map( (poll) => poll.id === newPoll.id ? newPoll: poll)
            );


        } catch (error) {
            console.error("Error fetching poll: ", error);
        }
    }

    const {ref, inView} = useInView({triggerOnce: false});

    const fetchPolls = async() => {
        if(loading && !hasMore) return;
        setLoading(true);

        try {
            const response = await axios.get(route('polls.fetch'), {
                params: {offset, limit},
            });

            const newPolls = response.data.polls;


            setCurrentPolls((prev) => [...prev, ...newPolls]);
            setOffset(prev => prev+limit);
            if(newPolls.length < 5) setHasMore(false);

        } catch(error) {
            console.error("Failed to fetch polls : ", error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        if(inView && hasMore) {
            fetchPolls();
        }
    }, [inView]);

    return (
        <AuthenticatedLayout

        >
            <Head title="Feed"/>

            <SmallHeaderPanel>
                <CategoryButton name='Funny'/>
                <CategoryButton name='Health'/>
                <CategoryButton name='Food'/>
                <CategoryButton name='Travel'/>
                <CategoryButton name='Politics'/>
                <CategoryButton name='Relationship'/>
            </SmallHeaderPanel>
            <div className="lg:pb-1 pb-10">
                {currentPolls.map(poll =>
                    <Poll_forNewsFeed key={poll.id} poll={poll} onChange={handleChange}/>
                )}
                {loading &&
                    <div className="loading-spinner flex justify-center items-center py-5">
                        <div className="w-8 h-8 border-4 border-t-4 border-gray-200 border-t-gray-800 rounded-full animate-spin"></div>
                    </div>
                }
                {!loading && hasMore && <div ref={ref}></div>}
            </div>


        </AuthenticatedLayout>


    );
}
