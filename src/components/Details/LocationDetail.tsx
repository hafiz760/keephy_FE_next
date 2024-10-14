"use client"
import DeleteIcon from '@/assets/icons/DeleteIcon';
import EditIcon from '@/assets/icons/EditIcon';
import withAuthValidation from '@/hoc/withAuth';
import { activateLocationForm, addFormsToLocation, deleteFranchiseById, getLocationForms } from '@/Redux/slices/serviceSlice';
import { AppDispatch } from '@/Redux/store/store';
import { useParams, useRouter } from 'next/navigation';
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import CustomModal from '../Modal/DeleteModal';
import LoaderIcon from '@/assets/icons/LoaderIcon';
import FormIcon from '@/assets/icons/FormIcon';
import TableSkelton from '@/shared/TableSkelton';
import BusinessFormsTable from '../table/BusinessFormsTable';
import Pagination from '@/shared/Pagination';
import { getAllForm } from '@/Redux/slices/formSlice';
import Logo from '@/assets/icons/Logo';
import PlusIcon from '@/assets/icons/plusIcon';
import Select from 'react-select';
import { toast } from 'react-toastify';

interface Option {
    readonly label: string;
    readonly value: string;
}

const LocationDetail = () => {
    const router = useRouter();
    const params = useParams();
    const dispatch = useDispatch<AppDispatch>();
    const singleFranchise = useSelector((state: any) => state?.service?.singleFranchise?.data);
    const isLocationLoading = useSelector((state: any) => state?.service?.isLoading);
    const [isDeleteModalOpen, setDeleteModalOpen] = useState(false);
    const [deleteFranchiseId, setDeleteFranchiseId] = useState<string>("");
    const [isAddingForms, setIsAddingForms] = useState(false);
    const [isAddFormModalOpen, setAddFormModalOpen] = useState(false);
    const businessId = params?.businessId;
    const locationForms = useSelector((state: any) => state?.service.franchiseForms);
    const allForms = useSelector((state: any) => state?.reviewForm?.allForms);
    const [currentPage, setCurrentPage] = useState<number>(1);
    const pageCount = Math.ceil(locationForms?.totalRecords / 10);
    const forms = React.useMemo(() => {
        // filter out the existing forms so that the dropdown only shows remaining forms
        const existingFroms = locationForms?.data?.map((f: any) => f._id) || [];
        return Array.isArray(allForms.data) ? (
            allForms.data.map((f: any) => ({
                value: f._id,
                label: f.name,
            })).filter((frm: any) => !existingFroms.includes(frm.value))
        ) : []
    }, [allForms.data, locationForms?.data]);

    const [selectedForms, setSelectedForms] = useState<readonly Option[]>([]);
    const [activatingForm, setActivatingForm] = useState('');
    const locationId = params?.locationId;
    const isLoading = isLocationLoading && !activatingForm;


    useEffect(() => {
        dispatch(getAllForm({}));
    }, [dispatch]);

    useEffect(() => {
        dispatch(getLocationForms({ currentPage, locationId: locationId as string }));
    }, [currentPage, locationId, dispatch]);

    
    const handlePageClick = (data: { selected: number }) => {
        setCurrentPage(data.selected);
    };

    const handleDeleteLocation = (id: any) => {
        setDeleteFranchiseId(id);
        setDeleteModalOpen(true);
    };

    const submitDeleteForm = () => {
        dispatch(deleteFranchiseById({ deleteFranchiseId, setDeleteModalOpen, router, businessId }))
        setDeleteModalOpen(true);
    };

    const submitAddForms = () => {
        if (selectedForms.length) {
            setIsAddingForms(true);
            dispatch(addFormsToLocation({
                locationId: locationId as string,
                formData: { forms: selectedForms.map((op) => op.value) }
            })).then(() => {
                // refetch business forms
                dispatch(getLocationForms({ currentPage, locationId: locationId as string }));
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
        dispatch(activateLocationForm({ locationId: locationId as string, formId }))
            .then(() => {
                // refetch business forms
                dispatch(getLocationForms({ currentPage, locationId: locationId as string }))
                    .then(() => setActivatingForm(''))
            })
    }
    return (
        <>
            <div className='gradient-bg'>
                {singleFranchise ? <div className='bg-white rounded-xl p-6 sm:pr-6 pr-8 shadow-[0px_0px_60px_30px_#00000008] relative'>
                    <div className="grid sm:grid-cols-2 grid-cols-1 gap-2">
                        <div className='flex flex-col gap-2'>
                            <p><span className='font-medium'>Location Adress: </span>{singleFranchise?.address}</p>
                            <p><span className='font-medium'>Primary Email: </span>{singleFranchise?.primaryEmail}</p>
                            <p className='font-medium'>Reporting Email:</p>

                            <ol className='list-inside list-decimal	'>
                                {singleFranchise?.reportingEmail.map((data: any, index: number) => (
                                    <li key={index}>
                                        {data}
                                    </li>
                                ))}
                            </ol>

                        </div>
                        <div className='flex flex-col gap-2'>
                            <p><span className='font-medium'>Opening Time: </span>{singleFranchise?.openingHour}</p>
                            <p><span className='font-medium'>Closing Time: </span>{singleFranchise?.closingHour}</p>
                        </div>
                    </div>
                </div> :
                    <div className="flex flex-col justify-center items-center min-h-52 bg-white rounded-xl gap-3 shadow-[0px_0px_60px_30px_#00000008]">
                        <Logo />
                        <h2 className='text-2xl font-primary'>No Location Data found</h2>
                    </div>}
                <div className="flex items-center justify-center mt-6">
                    <button
                        onClick={() => handleDeleteLocation(singleFranchise?._id)}
                        className="bg-black text-white py-3 px-4 rounded-full flex items-center gap-1 text-sm"
                    >
                        <DeleteIcon color="#ffffff" />
                        <span className="text-sm"> Delete Location</span>
                    </button>
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
                        locationForms?.data?.length > 0 ?
                            <>
                                <BusinessFormsTable forms={locationForms?.data} onActivateForm={(fid) => handleFormActivation(fid)} />
                                {pageCount > 1 && <div className='flex justify-center mt-4 mb-2'>
                                    <Pagination pageCount={pageCount} onPageChange={handlePageClick} currentPage={currentPage} />
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
                heading="Delete Location"
            >
                <>
                    <p>Are you sure you want to delete this location? This action cannot be undone, and all related data will be permanently removed.</p>
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
                        closeMenuOnSelect={false}
                        placeholder="Select Forms You Want To Add"
                        name="forms"
                        options={forms}
                        maxMenuHeight={100}
                        menuShouldBlockScroll={false}
                        menuShouldScrollIntoView={true}
                        className="react-select-container forms mb-10"
                        classNamePrefix="react-select"
                        components={{ DropdownIndicator: null }}
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

export default withAuthValidation(LocationDetail)