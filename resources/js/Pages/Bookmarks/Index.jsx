import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout.jsx";
import {Head} from "@inertiajs/react";
import Poll_forNewsFeed from "@/Pages/Polls/Partials/Poll_For_NewsFeed.jsx";
import SmallHeaderPanel from "@/Components/SmallHeaderPanel.jsx";

export default function({bookmarks}) {
    return (
        <AuthenticatedLayout>
            <Head title={'Bookmarks'}/>
            <SmallHeaderPanel>
                <h1 className={'font-bold text-xl'}>{bookmarks.length} bookmark{bookmarks.length > 1 ? 's' : ''} found: </h1>
            </SmallHeaderPanel>
            {bookmarks.map(bookmark => (
                <Poll_forNewsFeed poll={bookmark.poll}/>
            ))}
        </AuthenticatedLayout>
    )
}
