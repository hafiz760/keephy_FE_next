"use client"
import AuthHeadings from "@/shared/AuthHeadings";
import BusinessIcon from "@/assets/icons/BusinessIcon"
import withAuthValidation from "@/hoc/withAuth";
import BackIcon from "@/assets/icons/backIcon";
import { useParams, useRouter } from "next/navigation";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch } from "@/Redux/store/store";
import { editFranchise, getFranchiseById } from "@/Redux/slices/serviceSlice";
import { useEffect, useState } from "react";
import { Form, Formik } from "formik";
import { registerFranchiseErrorSchema } from "@/shared/Validations";
import BusinessFranchiseForm from "@/shared/BusinessFranchiseForm";

interface Option {
    readonly label: string;
    readonly value: string;
}

const convertToISO = (time: string, dateString: Date) => {
    const baseDate = new Date(dateString);
    const [timeH, timeM] = time?.split(":").map(Number) || [0, 0];
    const localTime = new Date(baseDate);
    localTime.setHours(timeH, timeM, 0, 0);
    return localTime.toISOString();
};

function EditFranchise() {
    const router = useRouter();
    const params = useParams();
    const dispatch = useDispatch<AppDispatch>();
    const id = params?.locationId;
    const businessId = params?.businessId;
    const singleFranchise = useSelector((state: any) => state?.service?.singleFranchise?.data);
    const [openingHour, setOpeningHour] = useState<string>('');
    const [closingHour, setClosingHour] = useState<string>('');
    const [emailArray, setEmailArray] = useState<readonly Option[]>([]);
    const [address, setAddress] = useState<{ area: string | null }>({
        area: singleFranchise?.address,
    });
    const dateString = new Date();
    const validValues = {
        primaryEmail: singleFranchise?.primaryEmail,
        businessLocation: singleFranchise?.address,
        reportingEmail: singleFranchise?.reportingEmail,
        openingHour: convertToISO(singleFranchise?.openingHour, dateString),
        closingHour: convertToISO(singleFranchise?.closingHour, dateString),
    };

    useEffect(() => {
        if (singleFranchise) {
            setOpeningHour(convertToISO(singleFranchise?.openingHour, dateString));
            setClosingHour(convertToISO(singleFranchise?.closingHour, dateString));
            setEmailArray(singleFranchise.reportingEmail.map((data: any) => ({
                label: data,
                value: data
            })));
        }
    }, [singleFranchise]);


    useEffect(() => {
        dispatch(getFranchiseById({ id }));
    }, [dispatch, id]);

    const formatTime = (date: Date) => {
        const hours = date.getHours().toString().padStart(2, '0');
        const minutes = date.getMinutes().toString().padStart(2, '0');
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
            reportingEmail: reportingEmail.map((email: any) =>
                typeof email === 'string' ? email : email.value
            )
        };
        dispatch(editFranchise({ id, data, router }))
    };
    return (
        <main className="container mt-12">
            <button className='text-[#1191D9] font-semibold text-base cursor-pointer mb-4 flex items-center gap-1' onClick={() => router.back()}><BackIcon /> Go Back</button>
            <div className="flex flex-col gap-4">
                <div className="flex items-center justify-between gap-6 sm:flex-nowrap flex-wrap">
                    <div className="flex items-center gap-3">
                        <div className="bg-[#FFC020] h-14 w-14 rounded-full flex items-center justify-center shrink-0">
                            <BusinessIcon />
                        </div>
                        <div>
                            <AuthHeadings heading={"Edit Location"} description={"Edit your location details using the fields below."} business />
                        </div>
                    </div>
                </div>
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
                                    type="submit"
                                    className=" bg-black border border-black text-white h-14 w-full max-w-44 rounded-full">
                                    Update
                                </button>
                            </div>
                        </Form>
                    )}
                </Formik>
            </div>
        </main>
    );
}
export default withAuthValidation(EditFranchise);