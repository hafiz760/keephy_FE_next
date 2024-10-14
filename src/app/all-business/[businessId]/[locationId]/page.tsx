"use client";
import withAuthValidation from "@/hoc/withAuth";
import {
    getFranchiseById,
} from "@/Redux/slices/serviceSlice";
import { AppDispatch } from "@/Redux/store/store";
import AuthHeadings from "@/shared/AuthHeadings";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import BackIcon from "@/assets/icons/backIcon";
import { useRouter } from "next/navigation";
import PlusIcon from "@/assets/icons/plusIcon";
import FormCard from "@/components/FormCard/FormCard";
import BusinessIcon from "@/assets/icons/BusinessIcon";
import LocationDetail from "@/components/Details/LocationDetail";
import EditIcon from "@/assets/icons/EditIcon";

const SingleFranchise = () => {
    const params = useParams();
    const dispatch = useDispatch<AppDispatch>();
    const router = useRouter();
    const singleFranchise = useSelector((state: any) => state?.service?.singleFranchise?.data);
    const id = params?.locationId;

    useEffect(() => {
        dispatch(getFranchiseById({ id }));
    }, [dispatch, id]);


    return (
        <main className="container">
            <button
                className="text-[#1191D9] font-semibold text-lg cursor-pointer mb-4 flex items-center gap-1"
                onClick={() => router.back()}
            >
                <BackIcon /> Go Back
            </button>
            <div className="flex flex-col gap-4 mb-6">
                <div className="flex items-center justify-between gap-6 flex-wrap">
                    <div className="flex items-center gap-3  sm:flex-nowrap flex-wrap">
                        <div className="bg-[#FFC020] h-14 w-14 rounded-full flex items-center justify-center shrink-0">
                            <BusinessIcon />
                        </div>
                        <AuthHeadings
                            heading={"Location"}
                            description={"Manage your registered location in one place."}
                            business
                        />
                    </div>
                    <button
                        onClick={() =>
                            router.push(`/all-business/${params?.businessId}/${params?.locationId}/edit`)
                        }
                        className="bg-black text-white py-3 px-4 rounded-full flex items-center gap-1 text-sm"
                    >
                        <EditIcon color="#ffffff" /> Edit Location
                    </button>
                </div>
                <LocationDetail />
            </div>
            {/* <FormCard /> */}
        </main>
    );
};
export default withAuthValidation(SingleFranchise);
