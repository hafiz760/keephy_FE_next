"use client"
import BackIcon from '@/assets/icons/backIcon';
import ThankYouImage from '@/assets/images/thankYou'
import { useRouter } from 'next/navigation'
import React from 'react'
import { useSelector } from 'react-redux';

const Thankyou = () => {
    const router = useRouter();
    const isLoggedIn = useSelector((state: any) => state?.user?.isLoggedIn);

    return (
        <div className='sm:h-[calc(100vh-200px)] h-[calc(100vh-220px)] w-full flex items-center justify-center gradient-bg'>
            <div className='flex flex-col sm:gap-3 gap-2 justify-center items-center text-center'>
                <ThankYouImage />
                <span className="sm:text-4xl text-2xl font-bold transition-all duration-300">
                    Thanks for submitting!
                </span>
                <span className="sm:text-xl text-lg font-primary transition-all duration-300">Your response have been received.</span>
                {isLoggedIn ?
                    <button
                        className="text-[#1191D9] font-semibold text-lg cursor-pointer flex items-center gap-1"
                        onClick={() => router.back()}
                    >
                        <BackIcon /> Go Back
                    </button>
                    :
                    <button className="text-[#1191D9] font-semibold text-lg cursor-pointer" onClick={() => router.push('/')}>{isLoggedIn ? "" : "Sign in to explore"}</button>
                }



            </div>
        </div>
    )
}

export default Thankyou