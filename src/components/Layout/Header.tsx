"use client";
import Logo from "@/assets/icons/Logo";
import HamburgerIcon from "@/assets/icons/Hamburger";
import LogOutIcon from "@/assets/icons/LogOutIcon";
import LanguageIcon from "@/assets/icons/LanguageIcon";
import React, { useState } from "react";
import { AppDispatch } from "@/Redux/store/store";
import { useDispatch, useSelector } from "react-redux";
import { logOut } from "@/Redux/slices/userSlice";
import { useParams, usePathname, useRouter } from 'next/navigation';
import Link from "next/link";

const links = [
    {
        name: "Home",
        href: "/home"
    },
    {
        name: "All Business",
        href: "/all-business"
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

interface HeaderProps {
    toggled: boolean;
    setToggled: any;
}

const Header: React.FC<HeaderProps> = ({ toggled, setToggled }) => {
    const params = useParams();
    const pathname = usePathname();
    const router = useRouter()
    const dispatch: AppDispatch = useDispatch();
    const isLoggedIn = useSelector((state: any) => state?.user?.isLoggedIn);

    const handleLogout = async () => {
        try {
            console.log('User logged out');
            await dispatch(logOut({ router }));

        } catch (error) {
            console.error('Logout failed:', error);
        }
    };

    return (
        <header className="container">
            <div className="flex items-center justify-between pt-5 py-7">
                <Link href={'/all-business'}>
                    <Logo />
                </Link>
                {isLoggedIn ?
                    <div className="flex items-center gap-10">
                        <div className="sm:flex hidden items-center gap-7">
                            {links.map((link, index) => (
                                <Link
                                    key={index} href={link.href}
                                    className={`${pathname?.includes(link.href) ? "font-bold" : "font-normal"} text-base`}
                                >
                                    {link.name}
                                </Link>
                            ))}
                        </div>
                        <div className="flex items-center gap-4 flex-shrink-0">
                            <button className="p-1 rounded-lg bg-black h-6 w-6">
                                <LanguageIcon />
                            </button>
                            <div className="relative group sm:block hidden">
                                <button className="p-1" onClick={handleLogout}>
                                    <LogOutIcon />
                                </button>
                                <span
                                    className="absolute right-0 lg:left-1/2 lg:transform lg:-translate-x-1/2 mt-1 text-xs hidden group-hover:block text-center rounded-md py-2 bg-white shadow-md"
                                    style={{ width: "100px" }}
                                >
                                    Log Out
                                </span>
                            </div>
                            <button onClick={() => setToggled(!toggled)} className="sm:hidden">
                                <HamburgerIcon />
                            </button>
                        </div>
                    </div>
                    :
                    <div className="flex items-center gap-4">
                        <a href="#" className="no-underline text-[#1E93E7] text-sm">
                            Have any questions?
                        </a>
                        <button className="p-1 rounded-lg bg-black">
                            <LanguageIcon />
                        </button>
                    </div>
                }
            </div>
        </header>
    );
};

export default Header;
