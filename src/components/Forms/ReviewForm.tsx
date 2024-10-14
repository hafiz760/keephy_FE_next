"use client";
import React, { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import LoaderIcon from "@/assets/icons/LoaderIcon";
import { AppDispatch } from "@/Redux/store/store";
import { useDispatch, useSelector } from "react-redux";
import RatingInput from "../TypeForm/RatingInput";
import InputField from "@/shared/InputField";
import BusinessNumberField from "@/assets/icons/BusinessNumberField";
import { Form, Formik } from "formik";
import EmailIcon from "@/assets/icons/EmailIcon";
import { FormState, submitReviewForm } from "@/Redux/slices/formSlice";
import { toast } from "react-toastify";
import { submitReviewErrorSchema } from "@/shared/Validations";
import ShortTextInput from "@/shared/ReviewFormShortText";
import LongTextInput from "@/shared/ReviewFormLongText";
import YesNoButtonGroup from "@/shared/ReviewFormYesNo";
import DropdownInput from "@/shared/ReviewFormDropdown";
import McqsInput from "@/shared/ReviewFormMcqs";
import BackIcon from "@/assets/icons/backIcon";
import EditIcon from "@/assets/icons/EditIcon";

// valid values
const validValues = {
    email: '',
    phone: '',
};

interface Question {
    _id: number;
    questionType: string;
    value: string | number;
    ratings?: number | string;
    questionLabel: string;
    [key: string]: any;
    isRequired: boolean;
}

interface ReviewFormProps {
    step: number;
    setStep: any;
    submissionForm: FormState['submissionForm']
}

const ReviewForm: React.FC<ReviewFormProps> = ({ step, setStep, submissionForm }) => {
    const router = useRouter();
    const dispatch: AppDispatch = useDispatch();
    const isLoading = useSelector((state: any) => state?.reviewForm?.isLoading);
    const allQuestions = submissionForm?.form?.questions;
    const isLoggedIn = useSelector((state: any) => state?.user?.isLoggedIn)
    const [inputs, setInputs] = useState<Question[]>([]);
    useEffect(() => {
        if (allQuestions && allQuestions.length > 0) {
            const filteredQuestions = allQuestions.map((question: Question) => ({
                _id: question._id,
                questionType: question.questionType,
                value: "",
                ratings: "",
                questionLabel: question.questionLabel,
                isRequired: question.isRequired
            }));
            setInputs(filteredQuestions);
        }
    }, [allQuestions]);

    const handleInputChange = (
        id: number,
        value?: string | number,
        ratings?: number | string
    ) => {
        const question = inputs.find((input) => input._id === id);
        if (!question) return;

        setInputs(
            inputs.map((input) => {
                if (input._id === id) {
                    if (input.questionType === 'rating' && ratings !== undefined) {
                        return {
                            ...input,
                            ratings,
                            ratingData: {
                                maxRating: ratings,
                                minRating: 1,
                            },
                        };
                    } else {
                        return {
                            ...input,
                            value: value ?? input.value,
                        };
                    }
                }
                return input;
            })
        );
    };

    const submitHandler = (values: any) => {
        if (step === 1) {
            setStep(step + 1);
            return;
        }
        const invalidInput = inputs.find((input) => {
            if (input.isRequired) {
                if (input.questionType === 'rating') {
                    return input.ratings === '' || input.ratings === undefined;
                } else {
                    return input.value === '' || input.value === undefined;
                }
            }
            return false;
        });

        if (invalidInput) {
            const errorMessage = `Please fill out the ${invalidInput.questionType || 'all'} field.`;
            toast.error(errorMessage);

            const inputElement = document.getElementById(invalidInput?._id.toString());
            if (inputElement) {
                inputElement.scrollIntoView({ behavior: 'smooth', block: 'center' });
                inputElement.focus();
            }
            return;
        }
        const formData = {
            code: submissionForm?.code,
            moduleName: submissionForm.moduleName,
            moduleId: submissionForm.moduleId,
            formId: submissionForm?.form?._id,
            answers: inputs.map((input) => {
                const answer = { questionLabel: input.questionLabel, answer: '' };
                if (input.questionType === 'rating') {
                    // return input.ratings;
                    answer.answer = input.ratings ? input.ratings.toString() : '';
                } else {
                    // return input.value;
                    answer.answer = input.value as string;
                }
                return answer;
            }),
            email: values.email,
            phone: values.phone
        };

        dispatch(submitReviewForm({ formData, router }));
    };

    return (
        <div>
            {/* commented step back code for now will remove later */}
            {/* {step !== 1 && <div className="flex items-center justify-center mb-4 border-b border-black pb-3">
                <button
                    type="button"
                    className="font-normal text-lg cursor-pointer flex items-center gap-1"
                    onClick={() => setStep(1)}
                >
                    <EditIcon /> Edit User Info
                </button>
            </div>} */}
            <div className="md:max-w-[600px] mx-auto flex flex-col gap-11">
                <Formik initialValues={validValues} validationSchema={submitReviewErrorSchema} onSubmit={submitHandler}>
                    {() => (
                        <Form className='w-full'>
                            <div className="flex flex-col gap-5">
                                {step == 1 ? <>
                                    <InputField
                                        business
                                        righticon={<EmailIcon />}
                                        placeholder={'Enter your email'}
                                        name="email"
                                        type={'email'} />
                                    <InputField
                                        business
                                        righticon={<BusinessNumberField />}
                                        placeholder={'Enter your phone number'}
                                        name="phone"
                                        type={'string'} />
                                </> :
                                    (allQuestions || [])?.map((question: any, index: any) => (
                                        <div key={index}>
                                            {question.questionType === "rating" && (
                                                <div className="flex flex-col gap-1" id={question._id}>
                                                    <label htmlFor="" className="font-medium text-base">{question.questionLabel + `${question.isRequired ? '*' : ''}`}</label>
                                                    <RatingInput
                                                        maxRating={question?.ratingData?.maxRating}
                                                        iconSize={24}
                                                        review
                                                        label={""}
                                                        name={`rating-${question._id}`}
                                                        value={inputs.find((input) => input._id === question._id)?.ratings as number}
                                                        onChange={(name, value) =>
                                                            handleInputChange(
                                                                question._id,
                                                                undefined,
                                                                value
                                                            )
                                                        }
                                                    />
                                                </div>
                                            )}
                                            {question.questionType === "yesno" && (
                                                <YesNoButtonGroup
                                                    selectedValue={inputs.find((input) => input._id === question._id)?.value}
                                                    handleInputChange={handleInputChange}
                                                    id={question._id}
                                                    label={question.questionLabel} />
                                            )}

                                            {question.questionType === "shortText" && (
                                                <ShortTextInput
                                                    id={question._id}
                                                    required={question.isRequired}
                                                    type="shortText"
                                                    value={inputs.find((input) => input._id === question._id)?.value as string}
                                                    handleInputChange={handleInputChange}
                                                    placeholder="Type your answer here..."
                                                    label={question.questionLabel}
                                                />
                                            )}
                                            {question.questionType === "longText" && (
                                                <LongTextInput
                                                    rows={3}
                                                    id={question._id}
                                                    required={question.isRequired}
                                                    type="longText"
                                                    value={inputs.find((input) => input._id === question._id)?.value as string}
                                                    handleInputChange={handleInputChange}
                                                    placeholder="Type your answer here..."
                                                    label={question.questionLabel}
                                                />
                                            )}

                                            {question.questionType === "dropdown" && (
                                                <DropdownInput
                                                    formType="review"
                                                    rows={3}
                                                    id={question._id}
                                                    type={question.questionType}
                                                    value={inputs.find((input) => input._id === question._id)?.value as string}
                                                    handleInputChange={handleInputChange}
                                                    placeholder="Add choices"
                                                    options={question.options}
                                                    label={question.questionLabel}
                                                />
                                            )}
                                            {question.questionType === "multipleChoice" && (

                                                <McqsInput
                                                    formType="review"
                                                    rows={3}
                                                    id={question._id}
                                                    type={question.questionType}
                                                    value={inputs.find((input) => input._id === question._id)?.value as string}
                                                    handleInputChange={handleInputChange}
                                                    placeholder="Add choices"
                                                    choices={question.choices}
                                                    label={question.questionLabel}

                                                />
                                            )}

                                        </div>
                                    ))
                                }

                            </div>
                            <div className="flex items-center justify-center mt-7">
                                <button
                                    type="submit"
                                    className=" bg-black text-white h-14 max-w-80 w-full rounded-full"
                                    disabled={isLoading}
                                >
                                    {isLoading ? (
                                        <LoaderIcon />
                                    ) :

                                        step === 1 ? "Next" : "Submit"}
                                </button>
                            </div>
                            {isLoggedIn ?
                                <div className="flex items-center justify-center mt-6">
                                    <button
                                        type="button"
                                        className="text-[#1191D9] font-semibold text-lg cursor-pointer flex items-center gap-1"
                                        onClick={() => router.back()}
                                    >
                                        <BackIcon /> Go Back
                                    </button>
                                </div>
                                :
                                ""}

                        </Form>
                    )}
                </Formik>
            </div>
        </div >
    );
};

export default ReviewForm;
