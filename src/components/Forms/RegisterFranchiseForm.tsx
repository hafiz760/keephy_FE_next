"use client"
import React, { useState } from 'react'
import { Formik, Form } from 'formik';
import { registerFranchiseErrorSchema } from "@/shared/Validations";
import { useDropzone } from 'react-dropzone';
import BusinessFranchiseForm from '@/shared/BusinessFranchiseForm';
import { useDispatch, useSelector } from 'react-redux';
import { useParams, useRouter } from 'next/navigation';
import { AppDispatch } from '@/Redux/store/store';
import { postFranchise } from '@/Redux/slices/serviceSlice';
import LoaderIcon from '@/assets/icons/LoaderIcon';

interface Option {
    readonly label: string;
    readonly value: string;
}
// valid values
const validValues = {
    primaryEmail: '',
    businessLocation: '',
    reportingEmail: [] as Option[],
    openingHour: '',
    closingHour: '',
};

const RegisterFranchiseForm = () => {
    const params = useParams();
    const businessId = params?.businessId;
    const router = useRouter()
    const dispatch: AppDispatch = useDispatch();
    const isLoading = useSelector((state: any) => state?.user?.isLoading);
    const [address, setAddress] = useState<{ area: string | null }>({
        area: null,
    });
    const [emailArray, setEmailArray] = useState<readonly Option[]>([]);
    const [openingHour, setOpeningHour] = useState<string>('');
    const [closingHour, setClosingHour] = useState<string>('');

    const formatTime = (date: Date) => {
        const hours = date.getHours().toString().padStart(2, '0');  // Get hours and ensure it's 2 digits
        const minutes = date.getMinutes().toString().padStart(2, '0');  // Get minutes and ensure it's 2 digits
        return `${hours}:${minutes}`;
    };

    const submitHandler = (values: any) => {
        const openingHour = new Date(values.openingHour);
        const closingHour = new Date(values.closingHour);
        const formattedOpeningHour = formatTime(openingHour);
        const formattedClosingHour = formatTime(closingHour);
        const { primaryEmail, reportingEmail, businessLocation } = values;
        const data = {
            businessId: businessId,
            address: businessLocation,
            openingHour: formattedOpeningHour,
            closingHour: formattedClosingHour,
            primaryEmail: primaryEmail,
            reportingEmail: reportingEmail.map((email: any) => email.value),
        };
        dispatch(postFranchise({ data, router }))
    };
    return (
        <Formik initialValues={validValues} validationSchema={registerFranchiseErrorSchema} onSubmit={submitHandler}>
            {() => (
                <Form className='w-full' id='registerbusiness'>
                    <BusinessFranchiseForm
                        formType="franchise"
                        emailArray={emailArray}
                        setEmailArray={setEmailArray}
                        address={address}
                        setAddress={setAddress}
                        setOpeningHour={setOpeningHour}
                        setClosingHour={setClosingHour}
                        openingHour={openingHour}
                        closingHour={closingHour}
                    />
                    <div className='flex items-center justify-center gap-4 mt-6'>
                        <button
                            type='button'
                            onClick={() => router.push(`/all-business/${businessId}`)}
                            className="bg-transparent border border-[#1E93E7] text-[#1E93E7] h-14 w-full max-w-44 rounded-full">
                            Skip
                        </button>
                        <button
                            type="submit"
                            disabled={isLoading}
                            className=" bg-black border border-black text-white h-14 w-full max-w-44 rounded-full">
                            {isLoading ? <LoaderIcon /> : "Continue"}
                        </button>
                    </div>
                </Form>
            )}
        </Formik>
    )
}

export default RegisterFranchiseForm