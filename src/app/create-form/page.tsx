"use client"
import BackIcon from '@/assets/icons/backIcon'
import FormIcon from '@/assets/icons/FormIcon'
import Card from '@/components/Cards/Card'
import withAuthValidation from '@/hoc/withAuth'
import AuthHeadings from '@/shared/AuthHeadings'
import { useRouter } from "next/navigation";
import React from 'react'
const CreateForm = () => {
    const router = useRouter();

    return (
        <>
            <main className="container h-full">
                <button className='text-[#1191D9] font-semibold text-base cursor-pointer mb-4 flex items-center gap-1' onClick={() => router.back()}><BackIcon /> Go Back</button>
                <div className="flex flex-col gap-4">
                    <div className="flex items-center gap-3  sm:flex-nowrap flex-wrap">
                        <div className="bg-[#26A8F1] h-14 w-14 rounded-full flex items-center justify-center">
                            <FormIcon />
                        </div>
                        <AuthHeadings heading={"Select an option to add content"} description={'Choose from the available content types or start from scratch to create something unique.'} business />
                    </div>
                </div>
                <Card />
            </main>
        </>
    )

}


export default withAuthValidation(CreateForm)
