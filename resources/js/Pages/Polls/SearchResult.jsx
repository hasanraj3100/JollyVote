import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout.jsx";
import Poll_forNewsFeed from "@/Pages/Polls/Partials/Poll_For_NewsFeed.jsx";

export default function SearchResult({polls, query}) {
    const count = polls.length;
    console.log(polls);
    return (
        <AuthenticatedLayout>
            <div className={'bg-white shadow-md p-6'}>
                <h1 className={'font-bold text-xl'}>{count} results found for "{query}": </h1>
            </div>

            {polls.map(poll => (
                <Poll_forNewsFeed poll={poll}/>
            ) )}
        </AuthenticatedLayout>
    );
}
