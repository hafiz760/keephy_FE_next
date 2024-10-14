import React from "react";
import { useRouter } from "next/navigation";

import CopyIcon from '@/assets/icons/CopyIcon';

interface BusinessFormsTableProps {
  forms: Array<any>;
  onActivateForm?: (formId: string) => void;
}

const Switch = (props: {isOn: boolean; onChange: (isOn: boolean) => void}) => {
  const activeColor = '#26A8F1';
  return (
    <label className="inline-flex items-center cursor-pointer" onClick={(e) => e.stopPropagation()}>
      <input type="checkbox" value="" className="sr-only peer" checked={props.isOn} onChange={(e) => props.onChange(e.target.checked)} />
      <div className="relative w-11 h-6 bg-gray-200 rounded-full peer peer-focus:ring-4 peer-focus:ring-blue-300 dark:peer-focus:ring-blue-800 dark:bg-gray-700 peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-0.5 after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-blue-600"></div>
    </label>
  )
}

const BusinessFormsTable: React.FC<BusinessFormsTableProps> = ({ forms, onActivateForm }) => {
  const router = useRouter();

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
                Questions
              </th>
              <th scope="col">
                Code
              </th>
              <th scope="col">
                Active
              </th>
            </tr>
          </thead>
          <tbody>
            {(forms || []).map((data: any, index: number) => {
              return (
                <tr key={index}
                  onClick={() => router.push(`/all-forms/${data._id}`)}
                  className="odd:bg-white even:bg-[#26A8F1] cursor-pointer h-[61px] even:bg-opacity-15 last:border-0 border-b border-[#D9D9D9] *:text-sm *:font-normal *:whitespace-nowrap *:px-6 *:py-2.5 *:capitalize">
                  <td
                    scope="row"
                  >
                    {data?.name}
                  </td>
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
                  <td className="flex gap-2 items-center mt-2">
                      {data?.code}
                      {data?.isActive && <CopyIcon 
                        className="hover:ring-blue-400 hover:ring-1 rounded-xl p-1 transition-all transition-ease transition-500" 
                        onClick={(e: any) => {
                          e.target.closest('svg').style.scale = '1.2';
                          e.stopPropagation();
                          window?.navigator?.clipboard.writeText(`${process.env.NEXT_PUBLIC_URL_LOCAL}add-review/${data?.code}`).then(() => {
                            setTimeout(() => e.target.closest('svg').style.scale = '', 500);
                          })
                        }}
                      />}
                  </td>
                  <td>
                      <Switch
                        isOn={data?.isActive} 
                        onChange={(isActive: boolean) => {
                          isActive && typeof onActivateForm === 'function' ? onActivateForm(data?._id as string) : null
                        }}
                      />
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

export default BusinessFormsTable;
