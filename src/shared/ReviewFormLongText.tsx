import React from 'react';

interface LongTextInputProps {
    type: 'longText';
    value?: string;
    placeholder: string;
    handleInputChange?: (questionId: number, value: string) => void;
    readOnly?: boolean;
    label?: string;
    required?: boolean;
    id?: number;
    rows: number
}

const LongTextInput: React.FC<LongTextInputProps> = ({
    type,
    value = '',
    placeholder,
    handleInputChange,
    readOnly = false,
    label,
    required,
    id,
    rows
}) => {
    if (type !== 'longText') return null;

    return (
        <div className="flex flex-col gap-1">
            {label && <label className="font-medium text-base">{label}</label>}
            <textarea
                required={required}
                className={`w-full text-lg  outline-none resize-none ${readOnly ? 'opacity-50 cursor-not-allowed h-14' : 'bg-white text-[#828282] focus:text-black border border-[#EDEDED] p-4 rounded-xl'} `}
                rows={rows}
                placeholder={placeholder}
                value={value}
                onChange={(e) => id && handleInputChange && handleInputChange(id, e.target.value)}
            />
        </div>
    );
};

export default LongTextInput;
