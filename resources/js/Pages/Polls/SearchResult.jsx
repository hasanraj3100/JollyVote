import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout.jsx";
import Poll_forNewsFeed from "@/Pages/Polls/Partials/Poll_For_NewsFeed.jsx";
import {Head} from "@inertiajs/react";
import SmallHeaderPanel from "@/Components/SmallHeaderPanel.jsx";

export default function SearchResult({polls, query}) {
    const count = polls.length;
    console.log(polls);
    return (
        <AuthenticatedLayout>
            <Head title={"Search Result"}/>
            <SmallHeaderPanel>
                <h1 className={'font-bold text-xl'}>{count} results found for "{query}": </h1>
            </SmallHeaderPanel>

            {polls.map(poll => (
                <Poll_forNewsFeed poll={poll}/>
            ) )}
        </AuthenticatedLayout>
    );
}
