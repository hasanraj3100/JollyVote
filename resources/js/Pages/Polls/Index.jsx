import {Head, router} from "@inertiajs/react";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout.jsx";
import Poll_forNewsFeed from "@/Pages/Polls/Partials/Poll_For_NewsFeed.jsx";
import CategoryButton from "@/Components/CategoryButton.jsx";
import {useEffect, useState} from "react";
import {useInView} from "react-intersection-observer";

export default function Index({polls}) {

    const [currentPolls, setCurrentPolls] = useState([]);
    const [loading, setLoading] = useState(false);
    const [hasMore, setHasMore] = useState(true);
    const [offset, setOffset] = useState(0);
    const limit = 15;

    const {ref, inView} = useInView({triggerOnce: false});


    useEffect(() => {
        setCurrentPolls((prevCurrentPolls) =>
            polls.filter((poll) => prevCurrentPolls.some((current) => current.id === poll.id))
        );
    }, [polls]);
    const fetchPolls = async() => {
        if(loading && !hasMore) return;
        setLoading(true);

        try {
            const response = await axios.get(route('polls.fetch'), {
                params: {offset, limit},
            });

            const newPolls = response.data.polls;
            console.log(newPolls);

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

            <div className={'bg-gray-300 mb-2 overflow-x-clip'}>
                <div className={'flex bg-white shadow-md rounded px-8 py-6 space-x-2'}>
                    <CategoryButton name='Funny'/>
                    <CategoryButton name='Health'/>
                    <CategoryButton name='Food'/>
                    <CategoryButton name='Travel'/>
                    <CategoryButton name='Politics'/>
                    <CategoryButton name='Relationship'/>
                </div>
            </div>
            <div className="lg:pb-1 pb-10">
                {currentPolls.map(poll =>
                    <Poll_forNewsFeed key={poll.id} poll={poll}/>
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
