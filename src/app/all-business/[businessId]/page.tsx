"use client";
import BusinessDetail from "@/components/Details/BusinessDetail";
import withAuthValidation from "@/hoc/withAuth";
import {
  getFranchiseByBusinessId,
  getSingleBusiness
} from "@/Redux/slices/serviceSlice";
import { AppDispatch } from "@/Redux/store/store";
import AuthHeadings from "@/shared/AuthHeadings";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import BackIcon from "@/assets/icons/backIcon";
import { useRouter } from "next/navigation";
import ImageDisplay from "@/shared/Image";
import EditIcon from "@/assets/icons/EditIcon";

const SingleBusiness = () => {
  const params = useParams();
  const dispatch = useDispatch<AppDispatch>();
  const router = useRouter();
  const [currentPage, setCurrentPage] = useState<number>(1);
  const singleBusiness = useSelector((state: any) => state?.service?.singleBusiness?.data);
  const allFranchise = useSelector((state: any) => state?.service?.allFranchiseByBusiness?.data);
  const pageCount = Math.ceil(allFranchise?.totalRecords / 10);

  useEffect(() => {
    const businessId = params?.businessId;
    dispatch(getFranchiseByBusinessId({ businessId, currentPage }));
  }, [dispatch, currentPage, params?.businessId]);

  useEffect(() => {
    const businessId = params?.businessId;
    dispatch(getSingleBusiness({ businessId }));
  }, [dispatch, params?.businessId]);

  const handlePageClick = (data: { selected: number }) => {
    setCurrentPage(data.selected);
  };

  return (
    <main className="container">
      <button
        className="text-[#1191D9] font-semibold text-lg cursor-pointer mb-4 flex items-center gap-1"
        onClick={() => router.back()}
      >
        <BackIcon /> Go Back
      </button>
      <div className="flex flex-col gap-4">
        <div className="flex items-center justify-between gap-6 flex-wrap">
          <div className="flex items-center gap-3  sm:flex-nowrap flex-wrap">
            <ImageDisplay
              src={
                process.env.NEXT_PUBLIC_API_URL_LOCAL +
                singleBusiness?.logo
              }
              alt="user-image"
              width={56}
              height={56}
              className="object-cover object-center h-14 w-14 rounded-full"
            />
            <AuthHeadings
              heading={singleBusiness?.name}
              description={"Manage all registered locations in one place."}
              business
            />
          </div>
          <div className="flex itemx-center gap-3 flex-wrap">
            <button
              onClick={() => router.push(`/all-business/${params?.businessId}/edit`)}
              className="bg-black text-white py-3 px-4 rounded-full flex items-center gap-1 text-sm"
            >
              <EditIcon color="#ffffff" />
              <span className="text-sm"> Edit business</span>
            </button>
          </div>
        </div>
        <BusinessDetail pageCount={pageCount} onPageChange={handlePageClick} currentPage={currentPage} />
      </div>
    </main>
  );
};
export default withAuthValidation(SingleBusiness);
