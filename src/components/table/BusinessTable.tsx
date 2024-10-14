"use client"
import React from "react";
import View2Icon from "@/assets/icons/View2Icon";
import { useRouter } from "next/navigation";
import DeleteModal from "../Modal/DeleteModal";
import { useSelector } from "react-redux";
import LoaderIcon from "@/assets/icons/LoaderIcon";
import ImageDisplay from "@/shared/Image";

interface BusinessTableProps {
  allBusiness: any;
  currentPage: any;
}
const BusinessTable: React.FC<BusinessTableProps> = ({ allBusiness, currentPage }) => {
  const router = useRouter();
  const isLoading = useSelector((state: any) => state?.service?.isLoading);

  return (
    <>
      <div className="relative overflow-x-auto overflow-hidden rounded-xl shadow-[0px_0px_60px_30px_#00000008]">
        <table className="w-full text-sm text-left text-black-500 border-collapse divide-y divide-[#D9D9D9]">
          <thead className="text-xs bg-[#26A8F1] text-white uppercase">
            <tr className="*:px-6 *:py-4 *:text-base *:font-medium *:whitespace-nowrap">
              <th scope="col">Business Name</th>
              <th scope="col">Primary Email</th>
              <th scope="col">Industry Type</th>
              {/* <th scope="col" className="text-center">Action</th> */}
            </tr>
          </thead>
          <tbody className="divide-y divide-[#D9D9D9]">
            {(allBusiness?.data?.docs || []).map((data: any, index: number) => {
              return (
                <tr key={index}
                  onClick={() => router.push(`all-business/${data._id}`)}
                  className="odd:bg-white even:bg-[#26A8F1] cursor-pointer even:bg-opacity-15 hover:bg-gray-100 *:text-sm *:font-normal *:whitespace-nowrap *:px-6 *:py-2.5 *:capitalize">
                  <td
                    scope="row"
                  >
                    <div className="flex gap-3 items-center">
                      <ImageDisplay
                        src={
                          process.env.NEXT_PUBLIC_API_URL_LOCAL +
                          data?.logo
                        }
                        alt="user-image"
                        width={32}
                        height={32}
                        className="object-cover object-center h-10 w-10 rounded-full border-2 border-[#26A8F1]"
                      />
                      {data?.name}
                    </div>
                  </td>
                  <td>{data?.primaryEmail}</td>
                  <td>{data?.categoryId?.name}</td>
                  {/* <td>({data?.reviews?.length}) Reviews</td> */}
                  {/* <td>
                    <div className="flex items-center justify-center gap-3">
                      <button
                        onClick={() => router.push(`all-business/${data._id}`)}
                      >
                        <View2Icon />
                      </button>
                    </div>
                  </td> */}
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </>
  );
};

export default BusinessTable;
