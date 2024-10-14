"use client"
import RegisterBusinessForm from "@/components/Forms/RegisterBusinessForm";
import AuthHeadings from "@/shared/AuthHeadings";
import BusinessIcon from "@/assets/icons/BusinessIcon"
import CircularProgressBar from "@/shared/Progress";
import withAuthValidation from "@/hoc/withAuth";
import { useDispatch } from "react-redux";
import { getCategories } from "@/Redux/slices/categorySlice";
import { AppDispatch } from "@/Redux/store/store";
import { useEffect } from "react";
import { useRouter } from "next/navigation";
import BackIcon from "@/assets/icons/backIcon"

const RegisterBusiness = () => {
    const router = useRouter();
    const dispatch = useDispatch<AppDispatch>();
    useEffect(() => {
        dispatch(getCategories());
    }, [dispatch])

    return (
        <main className="container mt-12">
            <button className='text-[#1191D9] font-semibold text-base cursor-pointer mb-4 flex items-center gap-1' onClick={() => router.back()}><BackIcon /> Go Back</button>
            <div className="flex flex-col gap-4">
                <div className="flex items-center justify-between gap-6 sm:flex-nowrap flex-wrap">
                    <div className="flex items-center gap-3">
                        <div className="bg-[#26A8F1] h-14 w-14 rounded-full flex items-center justify-center">
                            <BusinessIcon />
                        </div>
                        <div>
                            <AuthHeadings heading={"Register a Business"} description={"Fill in the fields to register your business."} business />
                        </div>
                    </div>
                    <div className="flex items-center gap-2">
                        <p className="text-sm font-medium">Completed</p>
                        <CircularProgressBar progress={20} color="text-[#1B8914]" />
                    </div>
                </div>
                <RegisterBusinessForm />
            </div>
        </main>
    );
}

export default withAuthValidation(RegisterBusiness);

