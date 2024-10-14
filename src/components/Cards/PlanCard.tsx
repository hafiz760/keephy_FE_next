import React from 'react';
import { useSelector } from 'react-redux';

type Plan = {
    _id: string;
    name: string;
    price: number;
    interval: string;
    description: string;
    free: boolean;
    productId: string;
    priceId: string;
    __v: number;
}

type Features = {
    [key: string]: string[];
};

interface CardProps {
    plan: Plan;
    selectedPlan: Plan | null | undefined;
    features: Features;
    setSelectedPlan: (plan: Plan | null | undefined) => void;
}

const PlanCard: React.FC<CardProps> = ({ plan, selectedPlan, features, setSelectedPlan }) => {
    const subscribedPlans = useSelector((state: any) => state?.plans?.subscribedPlan?.userSubscriptions);

    return (
        <div
            className={`shadow-[0px_0px_60px_30px_#00000008] h-full p-6 rounded-xl flex flex-col justify-between items-center gap-6 transition-all duration-300 cursor-pointer relative ${selectedPlan?._id === plan?._id ? 'bg-black text-white transform scale-y-100' : 'bg-white'
                }`}
            onClick={() => setSelectedPlan(plan)}
        >
            {subscribedPlans && subscribedPlans[0]?.planId?._id === plan?._id && <div className={`absolute -top-3 px-2 py-1 text-sm shadow-[0px_0px_60px_30px_#00000008] rounded-2xl ${selectedPlan?._id === plan?._id ? 'text-black bg-white' : 'text-white bg-black'}`}>
                Current Plan
            </div>}
            <div className="flex flex-col items-center text-center gap-4">
                <span className="text-2xl font-bold">{plan.name}</span>
                <span>{plan.description}</span>
                <div className="flex items-center justify-center">
                    <span className="lg:text-5xl text-4xl font-bold">${plan.price}</span>
                    {!plan.free && (
                        <>
                            <span>/</span>
                            <span className="capitalize">{plan.interval}</span>
                        </>
                    )}
                </div>
                <div className="flex flex-col items-start gap-3">
                    {features[plan._id]?.map((feature: string, index: number) => (
                        <span key={index} className="text-left flex items-start gap-3">
                            <div
                                className={`w-[8px] h-[18px] border-r-2 border-b-2 transform rotate-45 ${selectedPlan?._id === plan?._id ? 'border-white' : 'border-black'
                                    }`}
                            ></div>
                            {feature}
                        </span>
                    ))}
                </div>
            </div>
        </div >
    );
};

export default PlanCard;
