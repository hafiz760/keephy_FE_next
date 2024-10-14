"use client"
import React from 'react'
import { useRouter, useSearchParams } from 'next/navigation';
import { Formik, Form } from 'formik';
import { verifyOtpErrorSchema } from "@/shared/Validations";
import InputField from '@/shared/InputField';
import OtpIcon from "@/assets/icons/OtpIcon";
import { AppDispatch } from '@/Redux/store/store';
import { useDispatch } from 'react-redux';
import { verifyAccount } from '@/Redux/slices/userSlice';

// valid values
const validValues = {
    otp: '',
};

const VerifyAccountForm = () => {
    const router = useRouter();
    const searchParams = useSearchParams();
    const dispatch: AppDispatch = useDispatch();

    // form submit handler
    const submitHandler = (values: typeof validValues) => {
        var { otp } = values;
        const email = searchParams?.get('email');
        otp = otp.toString()
        dispatch(verifyAccount({ email, otp, router }));
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
                                    className=" bg-black text-white h-14 w-full rounded-full">
                                    Continue
                                </button>
                            </div>
                        </Form>
                    )}
                </Formik>
            </div>
        </div>
    )
}

export default VerifyAccountForm