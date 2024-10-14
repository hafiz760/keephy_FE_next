import React from 'react'

const SubcriptionSkelton = () => {
    return (
        <>
            <div className='grid sm:grid-cols-2 grid-cols-1 gap-4'>
                <div
                    className="p-6 animate-pulse border rounded-xl shadow-[0px_0px_60px_30px_#00000008] bg-white flex flex-col items-center"
                >
                    <div className="h-10 bg-gray-200 rounded mb-4 w-full"></div>
                    <div className="h-8 bg-gray-200 rounded mb-4 w-full"></div>
                    {Array.from({ length: 3 }).map((__, idx) => (
                        <div key={idx} className="h-4 bg-gray-200 rounded w-full mb-2"></div>
                    ))}
                    <div className="flex flex-col border border-[#EDEDED] p-3 rounded-xl mt-2 w-full">
                        <div className="grid grid-cols-2 text-black gap-3 items-center border-b border-[#EDEDED] pb-3 flex-wrap w-full">
                            <div className="h-8 bg-gray-200 rounded w-full"></div>
                            <div className="h-8 bg-gray-200 rounded w-full"></div>
                        </div>
                        <div className="grid grid-cols-2 text-black gap-3 items-center pt-3 flex-wrap">
                            <div className="h-8 bg-gray-200 rounded w-full"></div>
                            <div className="h-8 bg-gray-200 rounded w-full"></div>
                        </div>
                    </div>
                </div>
                <div
                    className="p-6 animate-pulse border rounded-xl shadow-[0px_0px_60px_30px_#00000008] bg-white flex flex-col gap-3 items-center"
                >
                    <div className="h-10 bg-gray-200 rounded mb-4 w-full"></div>
                    {Array.from({ length: 4 }).map((__, idx) => (
                        <div key={idx} className="h-6 bg-gray-200 rounded w-full mb-2"></div>
                    ))}
                </div>
            </div>
        </>
    )
}

export default SubcriptionSkelton