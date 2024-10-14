"use client"
import React, { useState } from 'react'
import { useRouter, useSearchParams } from 'next/navigation';
import Image from 'next/image';
import { Formik, Form } from 'formik';
import { createPasswordErrorSchema } from "@/shared/Validations";
import InputField from '@/shared/InputField';
import EyeIcon from '@/assets/icons/openEye.svg';
import CloseEye from '@/assets/icons/closeEye.svg';
import { useDispatch } from 'react-redux';
import { AppDispatch } from '@/Redux/store/store';
import { newPassword } from '@/Redux/slices/userSlice';

// valid values
const validValues = {
    password: '',
    cPassword: '',
};

const NewPasswordForm = () => {
    const router = useRouter()
    const [eye, setEye] = useState(false);
    const [eye1, setEye1] = useState(false);
    const [rememberMe, setRememberMe] = useState(false);

    // form submit handler
    const searchParams = useSearchParams();
    const dispatch: AppDispatch = useDispatch();

    // form submit handler
    const submitHandler = (values: typeof validValues) => {
        var { password, cPassword } = values;
        const email = searchParams?.get('email');
        const passwordConfirm = cPassword;
        dispatch(newPassword({ email, password, passwordConfirm, router }));
    }; return (
        <div className="container gradient-bg">
            <div className='mx-auto flex flex-col items-center gap-11 max-w-96 w-full'>
                <Formik initialValues={validValues} validationSchema={createPasswordErrorSchema} onSubmit={submitHandler}>
                    {() => (
                        <Form className='w-full'>
                            <div className='flex flex-col gap-4 mb-2.5'>

                                <InputField
                                    righticon={
                                        <Image
                                            className="field-righticon"
                                            src={eye ? CloseEye : EyeIcon}
                                            loading="lazy"
                                            width={20}
                                            height={20}
                                            onClick={() => {
                                                setEye(!eye);
                                            }}
                                            alt='passwordIcon'
                                        />
                                    }
                                    placeholder={'New Password'}
                                    name="password"
                                    type={eye ? 'text' : 'password'}
                                />
                                <InputField
                                    righticon={
                                        <Image
                                            className="field-righticon"
                                            src={eye1 ? CloseEye : EyeIcon}
                                            loading="lazy"
                                            width={20}
                                            height={20}
                                            onClick={() => {
                                                setEye1(!eye1);
                                            }}
                                            alt='passwordIcon'
                                        />
                                    }
                                    placeholder={'Confirm Password'}
                                    name="cPassword"
                                    type={eye1 ? 'text' : 'password'}
                                />
                            </div>
                            <label className="form-checkbox block relative pl-6 cursor-pointer select-none text-black font-normal w-max">
                                <input
                                    onChange={(e) => setRememberMe(e.target.checked)}
                                    type="checkbox" id="generalInquir43" name="generalInquiry" className='absolute opacity-0 cursor-pointer' />
                                <span className='text-sm text-[#8D8D8D] font-normal'>Remember me</span>
                                <span className="checkmark absolute top-1/2 left-0 h-4 w-4 rounded-[4px] border border-[#8D8D8D] -translate-y-1/2"></span>
                            </label>
                            <div className='flex flex-col items-center justify-center gap-4 mt-7'>
                                <button
                                    type="submit"
                                    className=" bg-black text-white h-14 w-full rounded-full">
                                    Continue
                                </button>
                                <p className='text-base font-normal text-[#8D8D8D]'>Already have an account? <span onClick={() => router.push('/login')} className='text-[#1191D9] font-medium cursor-pointer'>Login Here</span></p>
                            </div>
                        </Form>
                    )}
                </Formik>
            </div>
        </div>
    )
}

export default NewPasswordForm