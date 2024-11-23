import {Head, Link} from "@inertiajs/react";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout.jsx";
import Poll_forNewsFeed from "@/Pages/Polls/Partials/Poll_For_NewsFeed.jsx";

export default function Index({ polls=[] }) {

    return (
        <AuthenticatedLayout

        >
            <Head title="Feed" />


            <div className="py-1 sm:py-6">
                {polls.map(poll =>
                    <Poll_forNewsFeed key={poll.id} poll={poll}/>
                )}
            </div>

        </AuthenticatedLayout>


    );
}
