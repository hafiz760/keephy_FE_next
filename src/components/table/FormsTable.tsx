import React from "react";
import View2Icon from '@/assets/icons/View2Icon';
import { useParams, useRouter } from "next/navigation";
interface FormsTableProps {
  allForms: any;
}

const FormsTable: React.FC<FormsTableProps> = ({ allForms }) => {
  const router = useRouter();

  const timestampToTime = (timestamp: number | string | Date): string => {
    const date = new Date(timestamp);
    const options: Intl.DateTimeFormatOptions = {
      hour: "numeric",
      minute: "numeric",
      hour12: true,
    };
    return date.toLocaleTimeString("en-US", options);
  };

  return (
    <>
      <div className="relative overflow-x-auto overflow-hidden rounded-xl shadow-[0px_0px_60px_30px_#00000008]">
        <table className="w-full text-sm text-left text-black-500 border-collapse">
          <thead className="text-xs bg-[#26A8F1] text-white uppercase">
            <tr className="*:px-6 *:py-3 *:text-base *:font-medium *:whitespace-nowrap *:border-b border-[#D9D9D9]">
              <th scope="col">
                Form Name
              </th>
              <th scope="col">
                Is True
              </th>
              <th scope="col">
                Questions
              </th>
            </tr>
          </thead>
          <tbody>
            {(allForms || []).map((data: any, index: number) => {
              return (
                <tr key={index}
                  onClick={() => router.push(`/all-forms/${data._id}`)}
                  className="odd:bg-white even:bg-[#26A8F1] cursor-pointer h-[61px] even:bg-opacity-15 last:border-0 border-b border-[#D9D9D9] *:text-sm *:font-normal *:whitespace-nowrap *:px-6 *:py-2.5 *:capitalize">
                  <td
                    scope="row"
                  >
                    {data?.name}
                  </td>
                  <td>{data?.isTrue ? "Yes" : "No"}</td>
                  <td>
                    <div className="flex items-center">
                      {data?.questions?.map((question: any, index: any) => (
                        <span key={index}>
                          {question.questionType}
                          {index < data.questions.length - 1 && ','}
                        </span>
                      ))}
                    </div>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </>
  );
};

export default FormsTable;
