"use client";
import SubscriptionIcon from "@/assets/icons/subscription";
import withAuthValidation from "@/hoc/withAuth";
import { AppDispatch } from "@/Redux/store/store";
import AuthHeadings from "@/shared/AuthHeadings";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getSubscribedPlans } from "@/Redux/slices/planSlice";
import SubscriptionDetail from "@/components/Details/SubscriptionDetail";
import { useRouter } from "next/navigation";

const AllPlans = () => {
    const router = useRouter();
    const dispatch = useDispatch<AppDispatch>();
    const subscribedPlans = useSelector((state: any) => state?.plans?.subscribedPlan?.userSubscriptions);

    useEffect(() => {
        dispatch(getSubscribedPlans());
    }, [dispatch]);

    return (
        <main className="container">
            <div className="flex flex-col gap-6">
                <div className="flex items-center justify-between gap-6 sm:flex-nowrap flex-wrap">
                    <div className="flex items-center gap-3  sm:flex-nowrap flex-wrap">
                        <div className="bg-[#26A8F1] h-14 w-14 rounded-full flex items-center justify-center">
                            <SubscriptionIcon />
                        </div>
                        <AuthHeadings
                            heading={"Subscribed Plan"}
                            description={"Manage your subscription details and access personalized content based on your plan."}
                            business
                        />
                    </div>
                    <button
                        onClick={() => router.push("/checkout")}
                        className="bg-black text-white py-3 px-4 rounded-full flex items-center gap-1 text-sm"
                    >
                        {subscribedPlans.length > 0 ? "Upgrade Now" : "Subscribe Now"}
                    </button>
                </div>
                <SubscriptionDetail />
            </div>
        </main >
    );
};

export default withAuthValidation(AllPlans);
