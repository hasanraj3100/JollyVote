import {Head, router, usePage} from "@inertiajs/react";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout.jsx";
import OptionElement from "@/Pages/Polls/Partials/OptionElement.jsx";
import {useState} from "react";
import {Chart as ChartJS, CategoryScale, LinearScale, BarElement,Title, Tooltip, Legend} from "chart.js";
import {Bar} from "react-chartjs-2";
import Poll_forNewsFeed from "@/Pages/Polls/Partials/Poll_For_NewsFeed.jsx";
import {Button} from "@headlessui/react";

ChartJS.register(CategoryScale, LinearScale,BarElement, Title, Tooltip, Legend);
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

    const handleOpenModal = ()=> {
        setIsModalOpen(true);
    }

    const handleEdit = () => {
        router.visit(`edit/${poll.id}`);
    }

    const chartLabels = options.map(option => option.title);
    const chartData = options.map(option => {
        return poll.votes.filter(vote => vote.option_id === option.id).length;
    });

    const {auth} = usePage().props;
    const currentUserID = auth?.user?.id;

    return (
        <AuthenticatedLayout

        >
            <Head title={poll.title}/>


            {/*<div className="max-w-lg mx-auto bg-white border rounded-lg shadow-md p-4">*/}

            {/*    /!* Edit Button *!/*/}
            {/*    {poll.user.id === currentUserID &&*/}
            {/*        <div className="flex justify-between items-center mb-4">*/}
            {/*            <h2 className="text-lg font-bold flex-grow">{title}</h2>*/}
            {/*            <button*/}
            {/*                className="px-4 py-2 bg-green-500 text-white font-semibold rounded-lg hover:bg-green-600 transition duration-300"*/}
            {/*                onClick={handleEdit}*/}
            {/*            >*/}
            {/*                Edit*/}
            {/*            </button>*/}
            {/*        </div>*/}
            {/*    }*/}

            {/*    /!* Poll Title *!/*/}
            {/*    <h2 className="text-lg font-bold">{title}</h2>*/}
            {/*    <p className="text-sm text-gray-500 hover:text-blue-400 mb-4">*/}
            {/*        by {poll.user.name} · Posted on {new Date(poll.updated_at).toLocaleTimeString()}*/}
            {/*    </p>*/}

            {/*    /!* Poll Options *!/*/}
            {/*    {voteCounts.map((option, index) => (*/}
            {/*        <OptionElement key={option.id} option={option} totalVotes={totalVotes} pollId={poll.id}*/}
            {/*                       votes={poll.votes}/>*/}
            {/*    ))}*/}

            {/*    /!* Show on Chart Button *!/*/}

            {/*    <div className="flex justify-center mt-6">*/}
            {/*        <button*/}
            {/*            className="px-6 py-3 bg-blue-500 text-white font-semibold rounded-full hover:bg-blue-600 transition duration-300"*/}
            {/*            onClick={handleOpenModal}*/}
            {/*        >*/}
            {/*            Show on Chart*/}
            {/*        </button>*/}
            {/*    </div>*/}

            {/*</div>*/}

            {/*{isModalOpen && (*/}
            {/*    <div className="fixed inset-0 bg-white bg-opacity-90 z-50 flex items-center justify-center">*/}
            {/*        <div className="relative w-full h-full p-4">*/}
            {/*            /!* Close Button *!/*/}
            {/*            <button*/}
            {/*                onClick={handleCloseModal}*/}
            {/*                className="px-8 py-3 bg-red-500 text-white font-semibold rounded-full hover:bg-red-600 transition duration-300 mt-auto"*/}
            {/*            >*/}
            {/*                Close*/}
            {/*            </button>*/}
            {/*            /!* Modal Content *!/*/}
            {/*            <div className="l bg-white flex justify-center items-center">*/}
            {/*                /!* Add chart content here *!/*/}

            {/*                <Bar*/}
            {/*                    data={ {*/}
            {/*                        labels: chartLabels,*/}
            {/*                        datasets: [*/}
            {/*                            {*/}
            {/*                                label: "Votes",*/}
            {/*                                data: chartData,*/}
            {/*                                backgroundColor: 'rgba(75, 192, 192, 0.2)',*/}
            {/*                                borderColor: 'rgba(75, 192, 192, 1)',*/}
            {/*                                borderWidth: 1,*/}
            {/*                            }*/}
            {/*                        ]*/}
            {/*                    }}*/}

            {/*                    options={{*/}
            {/*                        responsive: true,*/}
            {/*                        plugins: {*/}
            {/*                            title: {*/}
            {/*                                display: true,*/}
            {/*                                text: poll.title,*/}
            {/*                                font: {*/}
            {/*                                    size: 32, // Increase the title font size*/}
            {/*                                    weight: 'bold',*/}
            {/*                                },*/}
            {/*                                padding: {*/}
            {/*                                    top: 20,*/}
            {/*                                    bottom: 20,*/}
            {/*                                },*/}
            {/*                            },*/}
            {/*                            tooltip: {*/}
            {/*                                enabled: true,*/}
            {/*                                bodyFont: {*/}
            {/*                                    size: 18, // Increase tooltip font size*/}
            {/*                                },*/}
            {/*                                titleFont: {*/}
            {/*                                    size: 18, // Increase tooltip title font size*/}
            {/*                                },*/}
            {/*                            },*/}
            {/*                        },*/}
            {/*                        scales: {*/}
            {/*                            x: {*/}
            {/*                                ticks: {*/}
            {/*                                    font: {*/}
            {/*                                        size: 24, // Increase the font size of the x-axis labels (A, B, C)*/}
            {/*                                    },*/}
            {/*                                },*/}
            {/*                            },*/}
            {/*                            y: {*/}
            {/*                                scaleLabel: {*/}
            {/*                                    display: true,*/}
            {/*                                    labelString: 'Votes',*/}
            {/*                                    font: {*/}
            {/*                                        size: 18, // Increase y-axis label font size*/}
            {/*                                    },*/}
            {/*                                },*/}
            {/*                                ticks: {*/}
            {/*                                    font: {*/}
            {/*                                        size: 18, // Increase y-axis tick font size*/}
            {/*                                    },*/}
            {/*                                },*/}
            {/*                            },*/}
            {/*                        },*/}
            {/*                    }}*/}

            {/*                />*/}
            {/*            </div>*/}
            {/*        </div>*/}
            {/*    </div>*/}
            {/*)}*/}


            <Poll_forNewsFeed poll={poll}/>


        </AuthenticatedLayout>
    )
}
