"use client";
import React from 'react'
import { useSelector } from 'react-redux';
import Logo from '@/assets/icons/Logo';
import SubcriptionSkelton from '@/shared/SubcriptionSkelton';

const features: { [key: string]: string[] } = {
    "66f69dfc2317187b59337ecf": [
        "Register 1 Business",
        "Limited access to basic features",
        "Add 1 Location",
        "Create 1 Review Form",
    ],
    "66f69d142317187b59337ec3": [
        "Register up to 3 Businesses",
        "Basic analytics dashboard",
        "Add up to 3 Locations",
        "Create up to 3 Review Forms",
    ],
    "66f69d762317187b59337ec5": [
        "Register Unlimited Businesses",
        "Advanced analytics and reporting",
        "Add Unlimited Location",
        "Create Unlimited Review Forms",
    ],
};

const SubscriptionDetail = () => {
    const isLoading = useSelector((state: any) => state?.plans?.isSubscribedPlanLoading);
    const subscribedPlans = useSelector((state: any) => state?.plans?.subscribedPlan?.userSubscriptions);

    return (
        <>
            <div className="gradient-bg 2xl:h-[calc(100vh-260px)] lg:flex lg:flex-col lg:justify-center lg:items-center">
                <div className="w-full">
                    {subscribedPlans.length > 0 ?
                        isLoading ?
                            <SubcriptionSkelton />
                            :
                            <>
                                {(subscribedPlans || []).map((plan: any, index: number) => (
                                    <div key={index} className='grid sm:grid-cols-2 grid-cols-1 gap-4'>
                                        <div className='bg-white rounded-xl shadow-[0px_0px_60px_30px_#00000008]'>
                                            <div className='px-6 py-3 border-b border-[#EDEDED]'>
                                                <h3 className='text-xl font-semibold'>Plan Detail:</h3>
                                            </div>
                                            <div className='px-6 py-3'>
                                                <p className="text-2xl font-bold mb-2">{plan.planId.name}</p>
                                                <p className='mb-4'>{plan.planId.description}</p>
                                                <div className="flex flex-col border border-[#EDEDED] p-3 rounded-xl mt-2">
                                                    <div className="flex justify-between text-black gap-3 items-center border-b  border-[#EDEDED] pb-3 flex-wrap">
                                                        <span className="text-base">Subscription Type</span>
                                                        <h4 className="text-lg font-semibold">{plan.planId?.name}</h4>
                                                    </div>
                                                    <div className="flex justify-between text-black gap-3 items-center pt-3 flex-wrap">
                                                        <span className="text-base">Total</span>
                                                        <h4 className="text-lg font-semibold">${plan.planId?.price}</h4>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>

                                        <div className='bg-white rounded-xl shadow-[0px_0px_60px_30px_#00000008]'>
                                            <div className='px-6 py-3 border-b border-[#EDEDED]'>
                                                <h3 className='text-xl font-semibold'>Plan Offering:</h3>
                                            </div>
                                            <div className="flex flex-col items-start gap-3 px-6 py-4">
                                                {(features[plan?.planId?._id] as string[])?.map((feature: string, index: number) => (
                                                    <span key={index} className="text-left flex items-start gap-3">
                                                        <div
                                                            className={`w-[8px] h-[18px] border-r-2 border-b-2 transform rotate-45 border-black`}
                                                        ></div>
                                                        {feature}
                                                    </span>
                                                ))}
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </>
                        :
                        <div className="flex flex-col justify-center items-center min-h-52 bg-white rounded-xl gap-3 shadow-[0px_0px_60px_30px_#00000008]">
                            <Logo />
                            <h2 className='text-2xl font-primary'>Oops! No Subscription Found</h2>
                        </div>
                    }
                </div>
            </div>
        </>
    )
}

export default SubscriptionDetail