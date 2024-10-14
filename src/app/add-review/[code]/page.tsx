"use client"
import ReviewForm from '@/components/Forms/ReviewForm';
import { FormState, getFormByCode } from '@/Redux/slices/formSlice';
import { AppDispatch } from '@/Redux/store/store';
import AuthHeadings from '@/shared/AuthHeadings';
import { useParams } from 'next/navigation';
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';

const PublicFormPage = () => {
    const params = useParams();
    const dispatch = useDispatch<AppDispatch>();
    const submissionForm = useSelector((state: {reviewForm: FormState}) => state?.reviewForm?.submissionForm);
    useEffect(() => {
        dispatch(getFormByCode({ formCode: params?.code as string }));
    }, [dispatch, params]);

    const [step, setStep] = useState<number>(1);

    return (
        <main className="flex flex-col items-center justify-between">
            <AuthHeadings heading={"Share Your Experience"} description={"Tell us what you think about this business"} />
            <div className="container gradient-bg">
                <div className="md:max-w-[600px] mx-auto flex flex-col gap-11">
                    <ReviewForm step={step} setStep={setStep} submissionForm={submissionForm} />
                </div>
            </div>
        </main>
    )
}

export default PublicFormPage