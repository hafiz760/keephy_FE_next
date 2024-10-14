import React from 'react'

const TableSkelton = ({ length }: { length: number }) => {
    return (
        <>
            <div className="animate-pulse flex flex-col gap-1 overflow-hidden rounded-xl">
                {Array.from({ length }).map((_, index) => (
                    <div key={index} className='h-14 bg-gray-200' />
                ))}
            </div>
        </>
    )
}

export default TableSkelton