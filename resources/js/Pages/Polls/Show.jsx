import {Head, usePage} from "@inertiajs/react";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout.jsx";
import {useState} from "react";
import Poll_forNewsFeed from "@/Pages/Polls/Partials/Poll_For_NewsFeed.jsx";
import EChartComponent from "@/Components/EChartComponent.jsx";

export default function Show({ poll }) {
    const {title, options} = poll;


    const voteCounts = options.map(option => {
        const count = poll.votes.filter(vote => vote.option_id === option.id).length;
        return {
            ...option, vote_count: count > 0 ? count : 0
        }
    });

    const totalVotes = poll.votes.length;

    const [isModalOpen, setIsModalOpen] = useState(false);

    const handleCloseModal = () => {
        setIsModalOpen(false);
    }



    const chartLabels = options.map(option => option.title);
    const chartData = options.map(option => {
        return poll.votes.filter(vote => vote.option_id === option.id).length;
    });

    const {auth} = usePage().props;
    const currentUserID = auth?.user?.id;

    const chartOptions = {

        tooltip: {},
        xAxis: {
            data: chartLabels,
            axisLabel: {
                fontSize:20,
                fontWeight: 'bold'
            }
        },
        yAxis: {},
        series: [
            {
                name: "Votes",
                type: "bar",
                data: chartData
            }
        ]
    };

    return (
        <AuthenticatedLayout

        >
            <Head title={poll.title}/>

            <Poll_forNewsFeed poll={poll} singleView={true} setModalOpen={setIsModalOpen}/>

            {isModalOpen && (
                <div className={"fixed inset-0 bg-white bg-opacity-90 z-50 flex items-center justify-center"}>
                    <div className={'relative w-full h-full p-4'}>
                        <button className={'px-8 py-3 bg-red-500 text-white font-semibold rounded-full ' +
                            'hover:bg-red-600 transition duration-300 mt-auto'}
                        onClick={()=>setIsModalOpen(false)}>
                            Close
                        </button>

                        <div className={'bg-white flex flex-col'}>
                            <h1 className={'text-center font-bold text-2xl'}>{poll.title}</h1>
                            <EChartComponent options={chartOptions} style={{ height: "500px", width: "100%" }}/>
                        </div>
                    </div>
                </div>
            )}




        </AuthenticatedLayout>
    )
}
