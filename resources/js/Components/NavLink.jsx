import {Link} from '@inertiajs/react';

export default function NavLink({
                                    active = false,
                                    className = '',
                                    children,
                                    name,
                                    ...props
                                }) {
    return (
        <Link
            {...props}
            className={
                'flex items-center space-x-3 hover:text-black'
            }
        >
            <div className={'text-2xl'}> <ion-icon name={`${name}${active ? '': '-outline'}`}></ion-icon>
            </div>
            <div>
                <span className={`font-bold ${active ? 'text-black' : ''}`}>{children}</span>
            </div>

        </Link>
    );
}
