import React from "react";
import View2Icon from '@/assets/icons/View2Icon';
import { useParams, useRouter } from "next/navigation";
interface FranchiseTableProps {
  allFranchise: any;
}

const FranchiseTable: React.FC<FranchiseTableProps> = ({ allFranchise }) => {
  const params = useParams();
  const router = useRouter();

  return (
    <>
      <div className="relative overflow-x-auto overflow-hidden rounded-xl shadow-[0px_0px_60px_30px_#00000008]">
        <table className="w-full text-sm text-left text-black-500 border-collapse">
          <thead className="text-xs bg-[#FFC020] text-white uppercase">
            <tr className="*:px-6 *:py-3 *:text-base *:font-medium *:whitespace-nowrap *:border-b border-[#D9D9D9]">
              <th scope="col">
                Primary Email
              </th>
              <th scope="col">
                Opening Hour
              </th>
              <th scope="col">
                Closing Hour
              </th>
              <th scope="col">
                Address
              </th>
              {/* <th scope="col" className="text-center">
                Action
              </th> */}
            </tr>
          </thead>
          <tbody>
            {(allFranchise || []).map((data: any, index: number) => {
              return (
                <tr key={index}
                  onClick={() => router.push(`/all-business/${params?.businessId}/${data._id}`)}
                  className="odd:bg-white even:bg-[#FFC020] cursor-pointer h-[61px] even:bg-opacity-15 last:border-0 border-b border-[#D9D9D9] *:text-sm *:font-normal *:whitespace-nowrap *:px-6 *:py-2.5 *:capitalize">
                  <td
                    scope="row"
                  >
                    {data?.primaryEmail}
                  </td>
                  <td>{data?.openingHour}</td>
                  <td>{data?.closingHour}</td>
                  <td className="lg:!whitespace-normal">{data?.address}</td>
                  {/* <td>
                    <div className="flex items-center justify-center gap-3">
                      <button
                        onClick={() => router.push(`/all-business/${params?.businessId}/${data._id}`)}>
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

export default FranchiseTable;
