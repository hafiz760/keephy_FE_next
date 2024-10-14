"use client";
import React, { useEffect, useMemo, useRef, useState } from 'react'
import { useSelector } from 'react-redux';
import CustomModal from '../Modal/DeleteModal';
import { Elements } from "@stripe/react-stripe-js";
import CardPaymentForm from '../Forms/PaymentForm';
import { loadStripe } from "@stripe/stripe-js";
import LoaderIcon from '@/assets/icons/LoaderIcon';
import PlanCardSkeleton from '@/shared/PlanCardSkelton';
import Slider from 'react-slick';
import Logo from '@/assets/icons/Logo';
import Pagination from '@/shared/Pagination';
import PlanCard from '../Cards/PlanCard';

interface Plan {
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

interface PlansDetailProps {
    pageCount: number;
    onPageChange: (selectedItem: { selected: number }) => void;
    currentPage: number;
}

const features = {
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

const PlansDetail: React.FC<PlansDetailProps> = ({ pageCount, onPageChange, currentPage }) => {
    const sliderRef = useRef(null);
    const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY as string);
    const [selectedPlan, setSelectedPlan] = useState<Plan | null | undefined>(null);
    const [isModalOpen, setModalOpen] = useState(false);
    const isLoading = useSelector((state: any) => state?.plans?.isAllPlanLoading);
    const isCreateSubscriptionLoading = useSelector((state: any) => state?.plans?.isCreateSubscriptionLoading);
    const allPlans = useSelector((state: any) => state?.plans?.allPlans);
    const subscribedPlans = useSelector((state: any) => state?.plans?.subscribedPlan?.userSubscriptions);

    const sortedPlans = useMemo(() => {
        return allPlans?.data?.docs ? [...allPlans.data.docs].sort((a, b) => a.price - b.price) : [];
    }, [allPlans]);

    useEffect(() => {
        if (subscribedPlans?.length) {
            const subscribedPlan = sortedPlans.find((plan: Plan) => plan._id === subscribedPlans[0].planId._id);
            setSelectedPlan(subscribedPlan)
        }
        else {
            const freePlan = sortedPlans.find((plan: Plan) => plan.free === true);
            setSelectedPlan(freePlan)

        }
    }, [sortedPlans, subscribedPlans])

    const createFreeSubscription = () => {
        setModalOpen(false);
    }

    const settings = {
        dots: true,
        infinite: true,
        speed: 500,
        slidesToShow: 1,
        slidesToScroll: 1,
        arrows: false,
    };

    return (
        <>
        
            <div className="gradient-bg 2xl:h-[calc(100vh-260px)] lg:flex lg:flex-col lg:justify-center lg:items-center">
                <div className="hidden sm:grid lg:grid-cols-3 sm:grid-cols-2 sm:gap-6 mb-6 w-full">
                    {sortedPlans.length > 0 ?
                        isLoading ? <PlanCardSkeleton length={3} /> :
                            <>
                                {sortedPlans.map((plan: any, index: any) => (
                                    <PlanCard key={index} plan={plan} selectedPlan={selectedPlan} features={features} setSelectedPlan={setSelectedPlan} />
                                ))}
                                {pageCount > 1 && <div className='flex justify-center mt-4 mb-2'>
                                    <Pagination pageCount={pageCount} onPageChange={onPageChange} currentPage={currentPage} />
                                </div>}
                            </>
                        : <div className="flex flex-col justify-center items-center min-h-52 bg-white rounded-xl gap-3 shadow-[0px_0px_60px_30px_#00000008]">
                            <Logo />
                            <h2 className='text-2xl font-primary'>No Plan found</h2>
                        </div>}
                </div>
                <div className='mb-8 block sm:hidden'>
                    {sortedPlans.length > 0 ?
                        isLoading ? <PlanCardSkeleton length={1} /> :
                            <Slider ref={sliderRef} {...settings}>
                                {sortedPlans.map((plan: any, index: any) => (
                                    <div key={index} className={`shadow-[0px_0px_60px_30px_#00000008] p-6 rounded-xl !flex flex-col justify-between items-center gap-2 transition-all duration-300 cursor-pointer ${selectedPlan?._id === plan?._id ? 'bg-black text-white transform scale-y-100' : 'bg-white'}`} onClick={() => setSelectedPlan(plan)}>
                                        {subscribedPlans && subscribedPlans[0]?.planId?._id === plan?._id && <div className={` px-2 py-1 text-sm shadow-[0px_0px_60px_30px_#00000008] w-max rounded-2xl ${selectedPlan?._id === plan?._id ? 'text-black bg-white' : 'text-white bg-black'}`}>
                                            Current Plan
                                        </div>}
                                        <div className="flex flex-col items-center text-center gap-4">
                                            <span className="text-2xl font-bold"> {plan.name}</span>
                                            <span className="flex-1">{plan.description}</span>
                                            <div className="flex items-center justify-center">
                                                <span className="text-4xl font-bold">${plan.price}</span>
                                                {!plan.free ?
                                                    <>
                                                        <span>/</span>
                                                        <span className="capitalize">{plan.interval}</span>
                                                    </>
                                                    :
                                                    ""
                                                }
                                            </div>
                                            <div className="flex flex-col items-start gap-3">
                                                {features[plan?._id as keyof typeof features]?.map((feature: string, index: number) => (
                                                    <span key={index} className="text-left flex items-start gap-3">
                                                        <div className={`w-[8px] h-[18px] border-r-2 border-b-2  transform rotate-45 ${selectedPlan?._id === plan?._id ? "border-white" : "border-black"}`}></div>

                                                        {feature}</span>
                                                ))}
                                            </div>
                                        </div>

                                    </div>
                                ))}
                            </Slider>

                        : ''}
                </div>
                {subscribedPlans[0]?.planId?._id !== selectedPlan?._id && <div className="flex items-center justify-center">
                    <button
                        onClick={() => setModalOpen(true)}
                        className={`z-10 py-4 px-6 rounded-full flex items-center gap-1 text-base transition-all duration-300 bg-black text-white`}>
                        Subscribe Now
                    </button>
                </div>}
            </div>
            <CustomModal
                isOpen={isModalOpen}
                onClose={() => setModalOpen(false)}
                heading="Payment Method"
            >
                <>
                    <div className="flex flex-col border border-[#EDEDED] p-3 rounded-xl mb-2">
                        <div className="flex justify-between text-black gap-3 items-center border-b border-[#EDEDED] pb-3 flex-wrap">
                            <span className="text-base">Subscription Type</span>
                            <h4 className="text-lg font-semibold">{selectedPlan?.name}</h4>
                        </div>
                        <div className="flex justify-between text-black gap-3 items-center pt-3 flex-wrap">
                            <span className="text-base">Total</span>
                            <h4 className="text-lg font-semibold">${selectedPlan?.price}</h4>
                        </div>
                    </div>

                    {selectedPlan?.free ?
                        <div className="flex items-center justify-center mt-2">
                            <button
                                disabled={isLoading}
                                onClick={() => createFreeSubscription()}
                                className={`z-10 py-3 px-6 rounded-full flex items-center gap-1 text-base bg-black text-white`}
                            >
                                {isCreateSubscriptionLoading ? <LoaderIcon /> : "Get Started For Free"}
                            </button>
                        </div>
                        :
                        <Elements stripe={stripePromise}>
                            <CardPaymentForm
                                planId={selectedPlan?._id}
                                setModalOpen={setModalOpen}
                            />
                        </Elements>
                    }
                </>
            </CustomModal>
        </>
    )
}

export default PlansDetail