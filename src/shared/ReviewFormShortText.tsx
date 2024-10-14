import React from 'react';

interface ShortTextInputProps {
    type: 'shortText';
    value?: string;
    placeholder: string;
    handleInputChange?: (questionId: number, value: string) => void;
    readOnly?: boolean;
    label?: string;
    required?: boolean;
    id?: number
}

const ShortTextInput: React.FC<ShortTextInputProps> = ({
    type,
    value = '',
    placeholder,
    handleInputChange,
    readOnly = false,
    label,
    required,
    id
}) => {
    if (type !== 'shortText') return null;

    return (
        <div className="flex flex-col gap-1">
            {label && <label className="font-medium text-base">{label}</label>}
            <input
                required={required}
                type="text"
                value={value}
                onChange={(e) => id && handleInputChange && handleInputChange(id, e.target.value)}
                className={`w-full text-lg  outline-none ${readOnly ? 'opacity-50 cursor-not-allowed' : 'bg-white text-[#828282] focus:text-black border border-[#EDEDED] h-14 p-4 rounded-xl'} `}
                placeholder={placeholder}
                readOnly={readOnly}
            />
        </div>
    );
};

export default ShortTextInput;
