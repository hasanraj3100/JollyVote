import NavLink from "@/Components/NavLink.jsx";
import NavButtonSm from "@/Components/NavButtonSm.jsx";

export default function GuestLayout({ children }) {
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

                        {/* Menu Items */}
                        <div className="flex flex-col space-y-8 text-gray-500">
                            <NavLink name={'home'} active={route().current('guest.home')} href={route('guest.home')}>Home</NavLink>
                            <NavLink name={'log-in'} active={route().current('login')} href={route('login')}>Login</NavLink>
                            <NavLink name={'person-add'} active={route().current('register')} href={route('register')}> Register </NavLink>
                        </div>
                    </div>

                    { /* Navbar Mobile */}
                    <div className="lg:hidden flex justify-evenly py-2 shadow-md border-b-2 absolute bottom-0 right-0 left-0
        bg-white z-10">
                        <NavButtonSm name={'home'} active={true}></NavButtonSm>
                        <NavButtonSm name={'log-in'} active={false}></NavButtonSm>
                        <NavButtonSm name={'person-add'} active={false}></NavButtonSm>
                    </div>
                </aside>

                <main className={'lg:w-1/2 border-r-2 shadow-md overflow-y-scroll'}>
                    {children}
                </main>

                <aside className={'hidden bg-white lg:block lg:w-1/4'}>
                    <div className="flex flex-col items-start p-4">


                        <div className="w-lg py-6 px-4 rounded-lg">
                            <h2 className="text-xl font-semibold text-gray-800 mb-4">
                                Trending Polls
                            </h2>

                            <ul className="space-y-4">
                                <li
                                    className="flex items-center space-x-3 hover:bg-gray-100 p-4 rounded-lg transition ease-in-out duration-200"
                                >
                <span className="text-2xl text-indigo-500">
                  <ion-icon name="flame"></ion-icon>
                </span>
                                    <div>
                                        <h3 className="text-md font-semibold text-gray-900">
                                            Which is better?
                                        </h3>
                                        <p className="text-sm text-gray-500">2 Hours Ago - 125 Upvotes</p>
                                    </div>
                                </li>
                                <li
                                    className="flex items-center space-x-3 hover:bg-gray-100 p-4 rounded-lg transition ease-in-out duration-200"
                                >
                <span className="text-2xl text-indigo-500">
                  <ion-icon name="flame"></ion-icon>
                </span>
                                    <div>
                                        <h3 className="text-md font-semibold text-gray-900">
                                            How to react in accidents?
                                        </h3>
                                        <p className="text-sm text-gray-500">4 Hours Ago - 98 Upvotes</p>
                                    </div>
                                </li>
                            </ul>
                        </div>
                    </div>
                </aside>
            </div>


        </>
    );
}
