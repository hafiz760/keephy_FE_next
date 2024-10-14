import React from 'react';

interface McqsInputProps {
    type: 'multipleChoice';
    value?: string;
    placeholder?: string;
    handleInputChange?: (questionId: number, value: string) => void;
    readOnly?: boolean;
    note?: string;
    required?: boolean;
    id?: number;
    rows: number;
    formType: 'create' | 'review';
    choices?: Array<string>;
    label?: string;
    defaultValue?: string;
}

const McqsInput: React.FC<McqsInputProps> = ({
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
    choices,
    label,
    defaultValue
}) => {
    if (type !== 'multipleChoice') return null;
    return (
        <div className="flex flex-col gap-1">

            {formType === "create" ?
                <>
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
                    {label && <label className="font-medium text-base">{label}</label>}

                    <div className="custom-radio flex flex-col gap-2 bg-white border border-[#EDEDED] px-4 py-3 rounded-xl">
                        {(choices || []).map((data: any, index: any) => (
                            <label className="form-radio" key={index}>
                                <input className="absolute opacity-0 cursor-pointer"
                                    onChange={(e) => id && handleInputChange &&
                                        handleInputChange(id, data)
                                    }
                                    type="radio" id={`multipleChoice${id}`} name={`multipleChoice${id}`} />
                                <span>{data}</span>
                                <span className="checkmark absolute top-[2px] left-0 h-5 w-5 bg-white border border-black rounded-full" />
                            </label>
                        ))}
                    </div>
                </>
            }

        </div>
    );
};

export default McqsInput;
