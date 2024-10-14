"use client"
import React from 'react'
import { useSelector } from 'react-redux';
import Logo from "@/assets/icons/Logo"
import TableSkelton from '@/shared/TableSkelton';
import BusinessTable from '../table/BusinessTable';
import Pagination from '@/shared/Pagination';

interface AllBusinessDetailProps {
    pageCount: number;
    onPageChange: (selectedItem: { selected: number }) => void;
    currentPage: number;
}

const AllBusinessDetail: React.FC<AllBusinessDetailProps> = ({ pageCount, onPageChange, currentPage }) => {
    const allBusiness = useSelector((state: any) => state?.service?.allBusiness);
    const isLoading = useSelector((state: any) => state?.service?.isLoading);
    return (

        <div className='gradient-bg'>
            {isLoading ?
                <TableSkelton length={10} /> :
                allBusiness?.data?.docs?.length > 0 ?
                    <>
                        <BusinessTable allBusiness={allBusiness} currentPage={currentPage} />
                        {pageCount > 1 && <div className='flex justify-center my-4'>
                            <Pagination pageCount={pageCount} onPageChange={onPageChange} currentPage={currentPage} />
                        </div>}
                    </>
                    :
                    <div className="flex flex-col justify-center items-center min-h-52 bg-white rounded-xl gap-3 shadow-[0px_0px_60px_30px_#00000008]">
                        <Logo />
                        <h2 className='text-2xl font-semibold'>Oops! No Business found</h2>
                    </div>
            }
        </div>
    )
}

export default AllBusinessDetail