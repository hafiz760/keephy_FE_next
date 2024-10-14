"use client"
import FormIcon from '@/assets/icons/FormIcon'
import Logo from '@/assets/icons/Logo'
import CustomModal from '@/components/Modal/DeleteModal'
import FormsTable from '@/components/table/FormsTable'
import withAuthValidation from '@/hoc/withAuth'
import { getAllForm } from '@/Redux/slices/formSlice'
import { AppDispatch } from '@/Redux/store/store'
import AuthHeadings from '@/shared/AuthHeadings'
import Pagination from '@/shared/Pagination'
import TableSkelton from '@/shared/TableSkelton'
import { useParams, useRouter } from 'next/navigation'
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'

const AllForms = () => {
    const router = useRouter();
    const dispatch = useDispatch<AppDispatch>();
    const [currentPage, setCurrentPage] = useState<number>(1);
    const allForms = useSelector((state: any) => state?.reviewForm?.allForms);
    const isLoading = useSelector((state: any) => state?.reviewForm?.isLoading);
    const pageCount = Math.ceil(allForms?.totalRecords / 10);

    useEffect(() => {
        dispatch(getAllForm({ currentPage }));
    }, [currentPage, dispatch]);

    const handlePageClick = (data: { selected: number }) => {
        setCurrentPage(data.selected);
    };


    return (
        <main className="container">
            <div className="flex flex-col gap-4">
                <div className="flex items-center justify-between gap-6 flex-wrap">
                    <div className="flex items-center gap-3  sm:flex-nowrap flex-wrap">
                        <div className="bg-[#26A8F1] h-14 w-14 rounded-full flex items-center justify-center">
                            <FormIcon />
                        </div>
                        <AuthHeadings
                            heading={"Forms"}
                            business
                        />
                    </div>
                    <button
                        onClick={() =>
                            router.push(
                                `/create-form`
                            )
                        }
                        className="bg-black text-white py-3 px-4 rounded-full text-sm"
                    >
                        Create New Questionare
                    </button>
                </div>
                {isLoading ?
                    <TableSkelton length={10} /> :
                    allForms?.data?.length > 0 ?
                        <>
                            <FormsTable allForms={allForms?.data} />
                            {pageCount > 1 && <div className='flex justify-center mt-4 mb-2'>
                                <Pagination pageCount={pageCount} onPageChange={handlePageClick} currentPage={currentPage} />
                            </div>}
                        </>
                        :
                        <div className="flex flex-col justify-center items-center min-h-52 bg-white rounded-xl gap-3 shadow-[0px_0px_60px_30px_#00000008]">
                            <Logo />
                            <h2 className='text-2xl font-primary'>Oops! No Form Found</h2>
                        </div>
                }
            </div>
        </main>
    )
}

export default withAuthValidation(AllForms)