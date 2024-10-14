import CloseIcon from '@/assets/icons/CloseIcon';
import Logo from '@/assets/icons/Logo';
import LogOutIcon from '@/assets/icons/LogOutIcon';
import { logOut } from '@/Redux/slices/userSlice';
import { AppDispatch } from '@/Redux/store/store';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import React from 'react'
import { useDispatch } from 'react-redux';

interface MobileNavProps {
    toggled: boolean;
    setToggled: any;
}

const links = [
    {
        name: "Home",
        href: "/home"
    },
    {
        name: "Add Business",
        href: "/add-business"
    },
    {
        name: "All Business",
        href: "/all-business"
    },
    {
        name: "Add Forms",
        href: "/add-forms"
    },
    {
        name: "All Forms",
        href: "/all-forms"
    },
    {
        name: "View Plans",
        href: "/checkout"
    }
]

const MobileNav: React.FC<MobileNavProps> = ({ toggled, setToggled }) => {
    const pathname = usePathname();
    const router = useRouter();
    const dispatch: AppDispatch = useDispatch();

    const handleLogout = async () => {
        try {
            console.log('User logged out');
            await dispatch(logOut({ router }));

        } catch (error) {
            console.error('Logout failed:', error);
        }
    };
    return (
        <>
            {toggled && <div onClick={() => setToggled(!toggled)} className='h-screen w-screen fixed inset-0 bg-black bg-opacity-50 z-10 sm:hidden'>
                <div className='absolute bg-white rounded-r-3xl h-full w-64 z-20'>
                    <div className='flex justify-between flex-col h-full'>
                        <div>
                            <div className='py-5 px-3 flex items-start justify-between mb-10'>
                                <Link href={'/all-business'} >
                                    <Logo />
                                </Link>
                                <button onClick={() => setToggled(!toggled)}>
                                    <CloseIcon />
                                </button>
                            </div>
                            <div className='flex flex-col gap-1'>
                                {links.map((data: any, index: any) => {
                                    return (
                                        <Link
                                            key={index}
                                            href={data.href}
                                            className={`${pathname?.includes(data.href) ? "font-bold bg-black !bg-opacity-20" : "font-normal"} text-base px-4 py-3 bg-black bg-opacity-0 hover:bg-opacity-5`}
                                        >
                                            {data.name}
                                        </Link>
                                    );
                                })}
                            </div>
                        </div>
                        <button className='p-4 flex items-center gap-2' onClick={handleLogout}>
                            <LogOutIcon />
                            <span>Logout</span>
                        </button>
                    </div>
                </div>
            </div>}
        </>

    )
}

export default MobileNav