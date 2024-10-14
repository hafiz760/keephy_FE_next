"use client"
import React from 'react'
import { useRouter, useSearchParams } from 'next/navigation';
import { Formik, Form } from 'formik';
import { verifyOtpErrorSchema } from "@/shared/Validations";
import InputField from '@/shared/InputField';
import OtpIcon from "@/assets/icons/OtpIcon";
import { AppDispatch } from '@/Redux/store/store';
import { useDispatch, useSelector } from 'react-redux';
import { verifyOtp } from '@/Redux/slices/userSlice';
import LoaderIcon from '@/assets/icons/LoaderIcon';

// valid values
const validValues = {
    otp: '',
};

const VerifyOtpForm = () => {
    const router = useRouter();
    const searchParams = useSearchParams();
    const dispatch: AppDispatch = useDispatch();
    const isLoading = useSelector((state: any) => state?.user?.isLoading);


    // form submit handler
    const submitHandler = (values: typeof validValues) => {
        var { otp } = values;
        const email = searchParams?.get('email');
        otp = otp.toString()
        dispatch(verifyOtp({ email, otp, router }));
    };
    return (
        <div className="container gradient-bg">
            <div className='mx-auto flex flex-col items-center gap-11 max-w-96 w-full'>
                <Formik initialValues={validValues} validationSchema={verifyOtpErrorSchema} onSubmit={submitHandler}>
                    {() => (
                        <Form className='w-full'>
                            <InputField
                                righticon={
                                    <OtpIcon />
                                }
                                placeholder={'Enter Otp'}
                                name="otp"
                                type="number"
                            />
                            <div className='flex flex-col items-center justify-center gap-6 mt-7'>
                                <button
                                    type="submit"
                                    className=" bg-black text-white h-14 w-full rounded-full"
                                    disabled={isLoading}
                                >
                                    {isLoading ? <LoaderIcon /> : "Continue"}
                                </button>
                            </div>
                        </Form>
                    )}
                </Formik>
            </div>
        </div>
    )
}

export default VerifyOtpForm