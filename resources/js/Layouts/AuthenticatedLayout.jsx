import ApplicationLogo from '@/Components/ApplicationLogo';
import Dropdown from '@/Components/Dropdown';
import NavLink from '@/Components/NavLink';
import ResponsiveNavLink from '@/Components/ResponsiveNavLink';
import {Link, router, useForm, usePage} from '@inertiajs/react';
import { useState } from 'react';
import NavButtonSm from "@/Components/NavButtonSm.jsx";
import {Button} from "@headlessui/react";
import NiceDateTime from "@/Components/NiceDateTime.jsx";

export default function AuthenticatedLayout({ header, children }) {
    const user = usePage().props.auth.user;
    const trendingPolls = usePage().props.auth.trendingPolls;



    const [showingNavigationDropdown, setShowingNavigationDropdown] =
        useState(false);

    const [query, setQuery] = useState('');

    const logout = (e) => {
        router.post(route('logout'));
    }



    return (
        <>
            <header className="flex h-20 bg-blue-500 items-center justify-center">
                <h1 className="text-white font-bold text-3xl">Jolly Vote</h1>
            </header>
            { /* Left Section */ }
            <div className={'flex flex-col lg:flex-row h-[calc(100vh-6rem)]'}>
                <aside className="bg-white lg:w-1/4 border-r-2 shadow-sm">
                    { /* Sidebar Desktop */}
                    <div className="hidden lg:flex flex-col items-start p-8 md:px-20">
                        <div className={"flex items-center space-x-4 mb-8"}>
                            <img className={"h-12 w-12 rounded-full"} src={"https://via.placeholder.com/40"}
                                 alt={"user avatar"}/>
                            <span className={"font-bold text-lg text-gray-500"}>{user.name}</span>
                        </div>
                        {/* Menu Items */}
                        <div className="flex flex-col space-y-8 text-gray-500">
                            <NavLink name={'home'} active={route().current('polls.index')} href={route('polls.index')}>Home</NavLink>
                            <NavLink name={'notifications'} >Notifications</NavLink>
                            <NavLink name={'bookmarks'} active={route().current('bookmarks.index')} href={route('bookmarks.index')}> Bookmarks </NavLink>
                            <NavLink name={'person'} active={route().current('profile.edit')} href={route('profile.edit')}> My Profile </NavLink>
                            <NavLink name={'log-out'} onClick={logout}> Logout </NavLink>

                            <Button
                                className={"bg-emerald-500 p-4 rounded-md text-white font-bold"}
                                onClick={()=> {router.visit(route('polls.create'))}}
                            >
                                <ion-icon name={'create-outline'}></ion-icon>
                                <span> New Poll</span>
                            </Button>
                        </div>
                    </div>

                    { /* Navbar Mobile */}
                    <div className="lg:hidden flex justify-evenly py-2 shadow-md border-b-2 absolute bottom-0 right-0 left-0
        bg-white z-10 transition">
                        <NavLink name={'home'} active={route().current('polls.index')} href={route('polls.index')}>
                            {route().current('polls.index') && (
                                <span className={`transition-all duration-300 ${route().current('polls.index') ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-2'}`}>
                                    Home
                                </span>
                            )}

                        </NavLink>
                        <NavLink name={'notifications'} ></NavLink>
                        <NavLink
                            name={'bookmarks'}
                            active={route().current('bookmarks.index')}
                            href={route('bookmarks.index')}> </NavLink>
                        <NavLink name={'person'} active={route().current('profile.edit')} href={route('profile.edit')}>
                            {route().current('profile.edit') && (
                                <span className={`transition-all duration-300 ${route().current('profile.edit') ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-2'}`}>
                                    Profile
                                </span>
                            )}
                        </NavLink>
                        <NavLink name={'log-out'} href={route('logout')}>  </NavLink>
                    </div>
                </aside>

                <main className={'lg:w-1/2 border-r-2 shadow-md overflow-y-scroll'}>
                    {children}
                </main>

                <aside className={'hidden bg-white lg:block lg:w-1/4'}>
                    <div className="flex flex-col items-start p-4">
                        <div className="relative w-full mb-4">
                            <form method={"GET"} action={route('polls.search')}>
                                <input
                                    type="text"
                                    name={'query'}
                                    placeholder="Search Polls"
                                    className="w-full pl-10 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                                />
                            </form>
                            <div className="absolute left-0 top-0 h-full flex items-center px-2">
                                <ion-icon name="search-outline" className="text-gray-500"></ion-icon>
                            </div>
                        </div>

                        <div className="w-lg py-6 px-4 rounded-lg">
                            <h2 className="text-xl font-semibold text-gray-800 mb-4">
                                Trending Polls
                            </h2>

                            <ul className="space-y-4">
                                {trendingPolls.map(poll => (
                                    <li
                                        className="flex items-center space-x-3 hover:bg-gray-100 p-4 rounded-lg transition ease-in-out duration-200"
                                        key={poll.id}
                                    >
                                    <span className="text-2xl text-indigo-500">
                                        <ion-icon name="flame"></ion-icon>
                                    </span>
                                        <Link href={route('polls.show', poll.slug)}>
                                            <h3 className="text-md font-semibold text-gray-900">
                                                {poll.title}
                                            </h3>
                                            <p className="text-sm text-gray-500"><NiceDateTime dateString={poll.created_at}/> - {poll.reactions_count} Upvotes</p>
                                        </Link>
                                    </li>
                                ))}

                            </ul>
                        </div>
                    </div>
                </aside>
            </div>


        </>
    );
}
