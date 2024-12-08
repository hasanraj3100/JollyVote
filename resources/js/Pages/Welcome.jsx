import { Head, Link } from '@inertiajs/react';
import GuestLayout from "@/Layouts/GuestLayout.jsx";


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

                <div className={'p-10'}>
                    <h1 className={'text-2xl font-bold p-5 text-center'}>Welcome to Jolly Vote!</h1>
                    <p className={'mt-5'}>Join a community of thoughtful individuals where you can create engaging polls, vote on others' opinions, and share your thoughts in the comments. Dive deeper into poll results with visually interactive statistics and graphs!
                        </p>
                    <p className={'mt-5'}>To get started, simply
                        <Link href={route('login')} className={'px-1 text-blue-700 font-bold hover:bg-blue-400'}>Login</Link>
                        or
                        <Link href={route('register')} className={'px-1 text-blue-700 font-bold hover:bg-blue-400'}>Register</Link>
                        to share your voice and see what others have to say.</p>

                </div>

            </GuestLayout>
        </>
    );
}
