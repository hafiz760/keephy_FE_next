"use client"
import withAuthValidation from '@/hoc/withAuth';
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import Logo from "@/assets/icons/Logo"
import TableSkelton from '@/shared/TableSkelton';
import FranchiseTable from '../table/FranchiseTable';
import Pagination from '@/shared/Pagination';
import BusinessIcon from '@/assets/icons/BusinessIcon';
import PlusIcon from '@/assets/icons/plusIcon';
import { useParams, useRouter } from 'next/navigation';
import DeleteIcon from '@/assets/icons/DeleteIcon';
import { deleteBusinessById, addFormsToBusiness, getBusinessForms, activateForm } from '@/Redux/slices/serviceSlice';
import { AppDispatch } from '@/Redux/store/store';
import CustomModal from '../Modal/DeleteModal';
import LoaderIcon from '@/assets/icons/LoaderIcon';
import FormIcon from '@/assets/icons/FormIcon';
import BusinessFormsTable from '../table/BusinessFormsTable';
import Select from 'react-select';
import { getAllForm } from '@/Redux/slices/formSlice';
import { toast } from 'react-toastify';

interface BusinessDetailProps {
    pageCount: number;
    onPageChange: (selectedItem: { selected: number }) => void;
    currentPage: number;
}

interface Option {
    readonly label: string;
    readonly value: string;
}

const BusinessDetail: React.FC<BusinessDetailProps> = ({ pageCount, onPageChange, currentPage }) => {
    const router = useRouter();
    const params = useParams();
    const dispatch = useDispatch<AppDispatch>();
    const allFranchise = useSelector((state: any) => state?.service?.allFranchiseByBusiness);
    const isBusinessLoading = useSelector((state: any) => state?.service?.isLoading);
    const singleBusiness = useSelector((state: any) => state?.service?.singleBusiness);
    const [isDeleteModalOpen, setDeleteModalOpen] = useState(false);
    const [isAddFormModalOpen, setAddFormModalOpen] = useState(false);
    const [isAddingForms, setIsAddingForms] = useState(false);
    const [deleteBusinessId, setDeleteBusinessId] = useState<string>("");
    const businessForms = useSelector((state: any) => state?.service?.businessForms);
    const allForms = useSelector((state: any) => state?.reviewForm?.allForms);
    const [selectedForms, setSelectedForms] = useState<readonly Option[]>([]);
    const [activatingForm, setActivatingForm] = useState('');
    const [formCurrentPage, setFormCurrentPage] = useState<number>(1);
    const formPageCount = Math.ceil(allForms?.totalRecords / 10);

    const forms = React.useMemo(() => {
        // filter out the existing forms so that the dropdown only shows remaining forms
        const existingFroms = businessForms?.data?.map((f: any) => f._id) || [];
        return Array.isArray(allForms.data) ? (
            allForms.data.map((f: any) => ({
                value: f._id,
                label: f.name,
            })).filter((frm: any) => !existingFroms.includes(frm.value))
        ) : []
    }, [allForms.data, businessForms?.data]);

    // do not show loading for WHOLE PAGE when one form is set active or forms are added
    const isLoading = isBusinessLoading && !activatingForm;


    useEffect(() => {
        // Here we need all the forms, instead of paginated results
        dispatch(getAllForm({}));
    }, [dispatch]);

    useEffect(() => {
        dispatch(getBusinessForms({ currentPage, businessId: params?.businessId as string }));
    }, [currentPage, params?.businessId, dispatch]);

    const handleDeleteBusiness = (id: any) => {
        setDeleteBusinessId(id)
        setDeleteModalOpen(true);
    };

    const submitDeleteForm = () => {
        dispatch(deleteBusinessById({ deleteBusinessId, setDeleteModalOpen, router }))
    };

    const handleFormPageChange = (data: { selected: number }) => {
        setFormCurrentPage(data.selected);
    };

    const submitAddForms = () => {
        if (selectedForms.length) {
            setIsAddingForms(true);
            dispatch(addFormsToBusiness({
                businessId: params?.businessId as string,
                formData: { forms: selectedForms.map((op) => op.value) }
            })).then(() => {
                // refetch business forms
                dispatch(getBusinessForms({ currentPage, businessId: params?.businessId as string }));
                setSelectedForms([]);
            }).finally(() => {
                setAddFormModalOpen(false);
                setIsAddingForms(false);
            });
        } else {
            toast.error("Please select a form to continue.")
        }
    };

    const handleFormActivation = (formId: string) => {
        setActivatingForm(formId);
        dispatch(activateForm({ businessId: params?.businessId as string, formId }))
            .then(() => {
                // refetch business forms
                dispatch(getBusinessForms({ currentPage, businessId: params?.businessId as string }))
                    .then(() => setActivatingForm(''))
            })
    }

    return (
        <>
            <div className='gradient-bg'>
                {singleBusiness?.data ? <div className='bg-white rounded-xl p-6 sm:pr-6 pr-8 mb-6 shadow-[0px_0px_60px_30px_#00000008] relative'>
                    <div className="grid sm:grid-cols-2 grid-cols-1 gap-2">
                        <div className='flex flex-col gap-2'>
                            <p><span className='font-medium'>Business Name: </span>{singleBusiness?.data?.name}</p>
                            <p><span className='font-medium'>Primary Email: </span>{singleBusiness?.data?.primaryEmail}</p>
                            <p><span className='font-medium'>Reporting Email: </span></p>

                            <ul className=' list-style'>
                                {singleBusiness?.data?.reportingEmail.length > 0 ?
                                    singleBusiness?.data?.reportingEmail.map((data: any, index: number) => (
                                        <li key={index}>
                                            {data}
                                        </li>
                                    )) : 'No Reporting Email Found'
                                }
                            </ul>

                        </div>
                        <div className='flex flex-col gap-2'>
                            <p><span className='font-medium'>Category: </span>{singleBusiness?.data?.categoryId?.name}</p>
                            <p><span className='font-medium'>Sub Category: </span>{singleBusiness?.data?.subcategory?.name}</p>
                            <p><span className='font-medium'>Reviews: </span>{singleBusiness?.data?.reviews.length}</p>
                        </div>
                    </div>
                </div> : <div className="flex flex-col justify-center items-center min-h-52 bg-white rounded-xl gap-3 shadow-[0px_0px_60px_30px_#00000008]">
                    <Logo />
                    <h2 className='text-2xl font-primary'>No Location Data found</h2>
                </div>}
                <div className="flex items-center justify-center mb-6">
                    <button
                        onClick={() => handleDeleteBusiness(singleBusiness?.data._id)}
                        className="bg-black text-white py-3 px-4 rounded-full flex items-center gap-1 text-sm"
                    >
                        <DeleteIcon color="#ffffff" />
                        <span className="text-sm"> Delete Business</span>
                    </button>
                </div>

                <div className="flex flex-col gap-4 mb-6">
                    <div className="flex items-center justify-between gap-6 flex-wrap">
                        <div className="flex items-center gap-3  sm:flex-nowrap flex-wrap">
                            <div className="bg-[#FFC020] h-14 w-14 rounded-full flex items-center justify-center shrink-0">
                                <BusinessIcon />
                            </div>
                            <div className='flex flex-col'>
                                <p className={`text-sm font-normal max-w-lg text-[#8D8D8D]`}>Locations by:</p>
                                <h2 className='text-xl font-medium text-black capitalize'>{singleBusiness?.data?.name} </h2>
                            </div>
                        </div>
                        <button
                            onClick={() =>
                                router.push(`/all-business/${params?.businessId}/add-franchise`)
                            }
                            className="bg-black text-white py-3 px-4 rounded-full flex items-center gap-1 text-sm"
                        >
                            <PlusIcon /> Add New Location
                        </button>
                    </div>
                    {isLoading ?
                        <TableSkelton length={10} /> :
                        allFranchise?.data?.Franchise.length > 0 ?
                            <>
                                <FranchiseTable allFranchise={allFranchise?.data?.Franchise} />
                                {pageCount > 1 && <div className='flex justify-center mt-4 mb-2'>
                                    <Pagination pageCount={pageCount} onPageChange={onPageChange} currentPage={currentPage} />
                                </div>}
                            </>
                            :
                            <div className="flex flex-col justify-center items-center min-h-52 bg-white rounded-xl gap-3 shadow-[0px_0px_60px_30px_#00000008]">
                                <Logo />
                                <h2 className='text-2xl font-primary'>No Location found</h2>
                            </div>
                    }
                </div>

                <div className="flex flex-col gap-4">
                    <div className="flex items-center justify-between gap-6 flex-wrap">
                        <div className="flex items-center gap-3  sm:flex-nowrap flex-wrap">
                            <div className="bg-[#26A8F1] h-14 w-14 rounded-full flex items-center justify-center">
                                <FormIcon />
                            </div>
                            <h2 className='text-xl font-medium text-black capitalize'>Forms</h2>
                        </div>
                        <button
                            onClick={() => setAddFormModalOpen(true)}
                            className="bg-black text-white py-3 px-4 rounded-full flex items-center gap-1 text-sm"
                        >
                            <PlusIcon /> Add Form
                        </button>
                    </div>
                    {isLoading ?
                        <TableSkelton length={10} /> :
                        businessForms?.data?.length > 0 ?
                            <>
                                <BusinessFormsTable forms={businessForms?.data} onActivateForm={(fid) => handleFormActivation(fid)} />
                                {pageCount > 1 && <div className='flex justify-center mt-4 mb-2'>
                                    <Pagination pageCount={formPageCount} onPageChange={handleFormPageChange} currentPage={formCurrentPage} />
                                </div>}
                            </>
                            :
                            <div className="flex flex-col justify-center items-center min-h-52 bg-white rounded-xl gap-3 shadow-[0px_0px_60px_30px_#00000008]">
                                <Logo />
                                <h2 className='text-2xl font-primary'>No Location found</h2>
                            </div>
                    }
                </div>
            </div>
            <CustomModal
                isOpen={isDeleteModalOpen}
                onClose={() => setDeleteModalOpen(false)}
                heading="Delete Business"
            >
                <>
                    <p>Are you sure you want to delete this business? This action cannot be undone, and all related data will be permanently removed.</p>
                    <div className="flex items-center w-100 gap-3 mt-3">
                        <button
                            className={`border-black border rounded-xl py-2 max-w-64 w-full bg-white text-black`}
                            onClick={() => setDeleteModalOpen(false)}
                        >
                            Cancel
                        </button>
                        <button
                            className={`border-red-600 border rounded-xl py-2 max-w-64 w-full bg-red-600 text-white`}
                            onClick={submitDeleteForm}
                        >

                            {isLoading ? (
                                <LoaderIcon />
                            ) :
                                "Delete"}
                        </button>
                    </div>
                </>
            </CustomModal>
            <CustomModal
                isOpen={isAddFormModalOpen}
                onClose={() => setAddFormModalOpen(false)}
                heading="Add Form"
            >
                <>
                    <p>Select the forms you want to add in this location and press &apos;Add&apos;</p>
                    <Select
                        isMulti
                        placeholder="Select Forms You Want To Add"
                        name="forms"
                        options={forms}
                        className="react-select-container forms mb-10"
                        classNamePrefix="react-select"
                        components={{ DropdownIndicator: null }}
                        maxMenuHeight={100}
                        menuShouldBlockScroll={false}
                        menuShouldScrollIntoView={true}
                        closeMenuOnSelect={false}
                        onChange={(newValue) => {
                            if (newValue) {
                                setSelectedForms(newValue);
                            }
                        }}
                        isClearable={false}
                        value={selectedForms}
                        styles={{
                            option: (provided: any, state: any) => ({
                                ...provided,
                                backgroundColor: state.isFocused ? '#f0f0f0' : '#fff',
                                color: state.isFocused ? '#333' : '#000',
                            }),
                        }}
                    />
                    <div className="flex items-center w-100 gap-3 mt-3">
                        <button
                            className={`border-black border rounded-xl py-2 max-w-64 w-full bg-white text-black`}
                            onClick={() => setAddFormModalOpen(false)}
                        >
                            Cancel
                        </button>
                        <button
                            className={`border-black border rounded-xl py-2 max-w-64 w-full bg-black text-white`}
                            disabled={isAddingForms}
                            onClick={submitAddForms}
                        >
                            {isAddingForms ? <LoaderIcon /> : 'Add'}
                        </button>
                    </div>
                </>
            </CustomModal>
        </>

    )
}

export default withAuthValidation(BusinessDetail)