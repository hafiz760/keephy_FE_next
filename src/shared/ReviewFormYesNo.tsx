import React from 'react';
import { boolean } from 'yup';

interface YesNoButtonGroupProps {
    id?: number;
    selectedValue?: string | number | undefined;
    handleInputChange?: (id: number, value: string) => void;
    readOnly?: boolean;
    label?: string;
}

const YesNoButtonGroup: React.FC<YesNoButtonGroupProps> = ({
    id,
    selectedValue,
    handleInputChange,
    readOnly,
    label
}) => {
    return (
        <div className="flex flex-col gap-2">
            {label && <label className="font-medium text-base">{label}</label>}
            <div className={`flex flex-col gap-2 ${readOnly ? '' :'bg-white border border-[#EDEDED] p-4 rounded-xl'}`}>
                <button
                    disabled={readOnly}
                    type="button"
                    onClick={() => id && handleInputChange && handleInputChange(id, 'Yes')}
                    className={`border-black border transition-colors rounded-xl py-2 max-w-64 w-full disabled:opacity-50 ${selectedValue === 'Yes' ? 'bg-black text-white' : 'bg-white text-black'}`}>
                    Yes
                </button>
                <button
                    disabled={readOnly}
                    type="button"
                    onClick={() => id && handleInputChange && handleInputChange(id, 'No')}
                    className={`border-black border transition-colors rounded-xl py-2 max-w-64 w-full disabled:opacity-50 ${selectedValue === 'No' ? 'bg-black text-white' : 'bg-white text-black'}`}>
                    No
                </button>
            </div>
        </div>
    );
};

export default YesNoButtonGroup;
