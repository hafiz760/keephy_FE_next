"use client";
import BusinessIcon from "@/assets/icons/BusinessIcon";
import AllBusinessDetail from "@/components/Details/AllBusinessDetail";
import withAuthValidation from "@/hoc/withAuth";
import { getAllBusiness } from "@/Redux/slices/serviceSlice";
import { AppDispatch } from "@/Redux/store/store";
import AuthHeadings from "@/shared/AuthHeadings";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useRouter } from "next/navigation";
import PlusIcon from "@/assets/icons/plusIcon";

const AllBusiness = () => {
  const router = useRouter();
  const dispatch = useDispatch<AppDispatch>();
  const [currentPage, setCurrentPage] = useState<number>(1);
  const allBusiness = useSelector(
    (state: any) => state?.service?.allBusiness
  );
  const pageCount = Math.ceil(allBusiness?.totalRecords / 10);

  useEffect(() => {
    dispatch(getAllBusiness({ currentPage }));
  }, [dispatch, currentPage]);

  const handlePageClick = (data: { selected: number }) => {
    setCurrentPage(data.selected);
  };
  return (
    <main className="container">
      <div className="flex flex-col gap-4">
        <div className="flex items-center justify-between gap-6 sm:flex-nowrap flex-wrap">
          <div className="flex items-center gap-3  sm:flex-nowrap flex-wrap">
            <div className="bg-[#26A8F1] h-14 w-14 rounded-full flex items-center justify-center">
              <BusinessIcon />
            </div>
            <AuthHeadings
              heading={"All Business"}
              description={"Manage all registered businesses in one place."}
              business
            />
          </div>
          <button
            onClick={() => router.push("/register-business")}
            className="bg-black text-white py-3 px-4 rounded-full flex items-center gap-1 text-sm"
          >
            <PlusIcon /> Add New Business
          </button>
        </div>
        <AllBusinessDetail
          pageCount={pageCount}
          onPageChange={handlePageClick}
          currentPage={currentPage}
        />
      </div>
    </main>
  );
};

export default withAuthValidation(AllBusiness);
