"use client";
import SubscriptionIcon from "@/assets/icons/subscription";
import withAuthValidation from "@/hoc/withAuth";
import { AppDispatch } from "@/Redux/store/store";
import AuthHeadings from "@/shared/AuthHeadings";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getAllPlans, getSubscribedPlans } from "@/Redux/slices/planSlice";
import PlansDetail from "@/components/Details/PlansDetail";
import { useRouter } from "next/navigation";

const AllPlans = () => {
  const router = useRouter();
  const dispatch = useDispatch<AppDispatch>();
  const [currentPage, setCurrentPage] = useState<number>(1);
  const allPlans = useSelector((state: any) => state?.plans?.allPlans);
  const pageCount = Math.ceil(allPlans?.totalRecords / 10);
  const subscribedPlans = useSelector(
    (state: any) => state?.plans?.subscribedPlan?.userSubscriptions
  );

  useEffect(() => {
    dispatch(getAllPlans({ currentPage }));
  }, [dispatch, currentPage]);

  useEffect(() => {
    dispatch(getSubscribedPlans());
  }, [dispatch]);

  const handlePageClick = (data: { selected: number }) => {
    setCurrentPage(data.selected);
  };

  return (
    <main className="container">
      <div className="flex flex-col gap-8">
        <div className="flex items-center justify-between gap-6 sm:flex-nowrap flex-wrap">
          <div className="flex items-center gap-3  sm:flex-nowrap flex-wrap">
            <div className="bg-[#26A8F1] h-14 w-14 rounded-full flex items-center justify-center">
              <SubscriptionIcon />
            </div>
            <AuthHeadings
              heading={"Payment Plans"}
              description={
                "Choose and manage your payment plans with flexible options and easy upgrades."
              }
              business
            />
          </div>
          {subscribedPlans?.length > 0 && (
            <button
              onClick={() => router.push("/subscription")}
              className="bg-black text-white py-3 px-4 rounded-full flex items-center gap-1 text-sm"
            >
              View Subscription
            </button>
          )}
        </div>
        <PlansDetail
          pageCount={pageCount}
          currentPage={currentPage}
          onPageChange={handlePageClick}
        />
      </div>
    </main>
  );
};

export default withAuthValidation(AllPlans);
