import Image from 'next/image';
import React from 'react';
import DropDownIcon from "@/assets/icons/arrow-down.svg";

interface DropdownInputProps {
    type: 'dropdown';
    value?: string;
    placeholder?: string;
    handleInputChange?: (questionId: number, value: string) => void;
    readOnly?: boolean;
    note?: string;
    required?: boolean;
    id?: number;
    rows: number;
    formType: 'create' | 'review';
    options?: Array<string>;
    label?: string;
    defaultValue?: string;
}

const DropdownInput: React.FC<DropdownInputProps> = ({
    type,
    value = '',
    placeholder,
    handleInputChange,
    readOnly = false,
    note,
    required,
    id,
    rows,
    formType,
    options,
    label,
    defaultValue
}) => {
    if (type !== 'dropdown') return null;

    return (
        <div className="flex flex-col gap-1">
            {formType === "create" ? <>
                {note && <p className="text-[#1191D9] text-sm mb-1">
                    {note}
                </p>}
                {defaultValue ?
                    <textarea
                        required={required}
                        className={`w-full text-lg  outline-none resize-none ${readOnly ? 'opacity-50 cursor-not-allowed h-14' : 'bg-white text-[#828282] focus:text-black border border-[#EDEDED] p-2 rounded-xl'} `}
                        rows={rows}
                        placeholder={placeholder}
                        defaultValue={defaultValue}
                        onChange={(e) => id && handleInputChange && handleInputChange(id, e.target.value)}
                    /> :
                    <textarea
                        required={required}
                        className={`w-full text-lg  outline-none resize-none ${readOnly ? 'opacity-50 cursor-not-allowed h-14' : 'bg-white text-[#828282] focus:text-black border border-[#EDEDED] p-2 rounded-xl'} `}
                        rows={rows}
                        placeholder={placeholder}
                        value={value}
                        onChange={(e) => id && handleInputChange && handleInputChange(id, e.target.value)}
                    />
                }
            </> :
                <>

                    <label className="font-medium text-base">{label}</label>
                    <div className="dropdown inline-block relative group">
                        <button className="border border-[#EDEDED] bg-white text-black transition-colors rounded-xl group-hover:rounded-b-none py-2 w-full flex items-center justify-between gap-2 h-14 p-4">
                            <span className="mr-1">{value || 'Select'}</span>
                            <Image src={DropDownIcon} height={16} width={16} alt="DropDownIcon" />
                        </button>
                        <ul className="group-hover:block border border-[#EDEDED] dropdown-menu absolute hidden text-gray-700 rounded-b-xl overflow-hidden bg-white z-50 w-full">
                            {(options || []).map((data: any, index: any) => (
                                <li
                                    onClick={() => id && handleInputChange && handleInputChange(id, data)}
                                    key={index}><div className={`${value === data ? 'bg-black text-white' : 'bg-white hover:bg-black hover:text-white'}  cursor-pointer transition-colors py-2 px-4 block whitespace-no-wrap`}>{data}</div></li>
                            ))}
                        </ul>
                    </div>
                </>
            }

        </div>
    );
};

export default DropdownInput;
