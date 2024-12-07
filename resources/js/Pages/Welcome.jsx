import { Head, Link } from '@inertiajs/react';
import GuestLayout from "@/Layouts/GuestLayout.jsx";
import CategoryButton from "@/Components/CategoryButton.jsx";
import ShowAll from "@/Pages/Polls/ShowAll.jsx";

export default function Welcome({ auth, laravelVersion, phpVersion }) {
    const handleImageError = () => {
        document
            .getElementById('screenshot-container')
            ?.classList.add('!hidden');
        document.getElementById('docs-card')?.classList.add('!row-span-1');
        document
            .getElementById('docs-card-content')
            ?.classList.add('!flex-row');
        document.getElementById('background')?.classList.add('!hidden');
    };

    return (
        <>
            <Head title="Welcome" />
            <GuestLayout>

                    <div className={'bg-gray-300 mb-2'}>
                        <div className={'flex bg-white shadow-md rounded px-8 py-6 space-x-2'}>
                            <CategoryButton name='Funny'/>
                            <CategoryButton name='Health'/>
                            <CategoryButton name='Food'/>
                            <CategoryButton name='Travel'/>
                            <CategoryButton name='Politics'/>
                            <CategoryButton name='Relationship'/>

                        </div>
                    </div>

                    <ShowAll/>

            </GuestLayout>
        </>
    );
}
