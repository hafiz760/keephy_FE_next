"use client"
import React, { useCallback, useEffect, useState } from 'react'
import { Formik, Form } from 'formik';
import { registerBusinessErrorSchema } from "@/shared/Validations";
import { useDropzone } from 'react-dropzone';
import BusinessFranchiseForm from '@/shared/BusinessFranchiseForm';
import { useDispatch, useSelector } from 'react-redux';
import { postBusiness } from '@/Redux/slices/serviceSlice';
import { AppDispatch } from '@/Redux/store/store';
import { toast } from 'react-toastify';
import { useRouter } from 'next/navigation';
import LoaderIcon from '@/assets/icons/LoaderIcon';

interface Option {
    readonly label: string;
    readonly value: string;
}

// valid values
const validValues = {
    businessName: '',
    industryType: '',
    industryCategoryType: '',
    primaryEmail: '',
    reportingEmail: [] as Option[],
};

const RegisterBusinessForm = () => {
    const router = useRouter()
    const dispatch: AppDispatch = useDispatch();
    const [emailArray, setEmailArray] = useState<readonly Option[]>([]);
    const [docFiles, setDocFiles] = useState<File[]>([]);
    const [preview, setPreview] = useState<string | null>(null);
    const [categories, setCategories] = useState<{ value: string; option: string }[]>([]);
    const [selectedCategory, setSelectedCategory] = useState<string | undefined>(undefined);
    const [subCategories, setSubCategories] = useState<{ value: string; option: string }[]>([]);
    const category = useSelector((state: any) => state?.category.category.categories);
    const isLoading = useSelector((state: any) => state?.user?.isLoading);

    useEffect(() => {
        if (category) {
            const tempCategory = category?.map((data: any) => {
                return { value: data._id, option: data.name };
            });
            setCategories(tempCategory);
        }
    }, [category]);

    useEffect(() => {
        if (selectedCategory) {
            const selectedCat = category?.find((data: any) => data._id === selectedCategory);
            if (selectedCat?.subcategories) {
                const tempSubCategories = selectedCat.subcategories.map((sub: any) => ({
                    value: sub._id,
                    option: sub.name,
                }));
                setSubCategories(tempSubCategories);
            }
            else {
                return
            }
        }
    }, [selectedCategory, category]);

    const onDrop = useCallback((acceptedFiles: File[]) => {
        const file = acceptedFiles;
        if (file) {
            setPreview(URL.createObjectURL(file[0]));
            setDocFiles(acceptedFiles);
        }
    }, []);

    const { getRootProps, getInputProps } = useDropzone({ onDrop });

    const submitHandler = (values: typeof validValues) => {
        if (docFiles.length < 1) {
            toast.error("Please select a logo")
            return
        }
        const formData = new FormData();
        const { businessName, industryType, industryCategoryType, primaryEmail, reportingEmail } = values;
        formData.append("name", businessName);
        formData.append("categoryId", industryType);
        formData.append("subCategoryId", industryCategoryType);
        formData.append("primaryEmail", primaryEmail);
        reportingEmail.map((email: any) => formData.append('reportingEmail', email.value));
        formData.append("logo_img", docFiles[0]);

        dispatch(postBusiness({ formData, router }))
    };
    return (
        <>
            <Formik initialValues={validValues} validationSchema={registerBusinessErrorSchema} onSubmit={submitHandler}>
                {() => (
                    <Form className='w-full' id='registerbusiness'>
                        <BusinessFranchiseForm
                            docFiles={docFiles}
                            getRootProps={getRootProps}
                            getInputProps={getInputProps}
                            industryTypes={categories}
                            industryCategoryType={subCategories}
                            setSelectedCategory={setSelectedCategory}
                            formType='business'
                            emailArray={emailArray}
                            setEmailArray={setEmailArray}
                            preview={preview}
                        // value={value} onChange={onChange}
                        // address={address} setAddress={setAddress}
                        />
                        <div className='flex flex-col items-center justify-center gap-4 mt-6'>
                            <button
                                disabled={isLoading}
                                type="submit"
                                className=" bg-black text-white h-14 w-full max-w-44 rounded-full">
                                {isLoading ? <LoaderIcon /> : "Continue"}
                            </button>
                        </div>
                    </Form>
                )}
            </Formik>
        </>
    )
}

export default RegisterBusinessForm