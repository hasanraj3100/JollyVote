import {Head, Link} from "@inertiajs/react";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout.jsx";
import Poll_forNewsFeed from "@/Pages/Polls/Partials/Poll_For_NewsFeed.jsx";
import CategoryButton from "@/Components/CategoryButton.jsx";

export default function Index({ polls }) {

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
                {polls.map(poll =>
                    <Poll_forNewsFeed key={poll.id} poll={poll}/>
                )}
            </div>

        </AuthenticatedLayout>


    );
}
