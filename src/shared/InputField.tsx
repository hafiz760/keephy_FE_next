import React, { ReactNode } from 'react';
import { ErrorMessage, useField } from 'formik';

interface InputFieldProps {
    righticon?: ReactNode;
    icon?: ReactNode;
    name: string;
    type?: string;
    placeholder?: string;
    business?: boolean;
}

const InputField: React.FC<InputFieldProps> = ({ righticon, icon, business, ...props }) => {
    const [field, meta] = useField(props);
    return (
        <React.Fragment>
            <div className="flex flex-col gap-1">
                <div className={`flex items-center bg-white justify-between gap-2 border border-[#EDEDED] h-14 p-4 rounded-xl ${business ? '' : 'md:min-w-72'}`}>
                    {icon}
                    <input
                        className={`autofill:!bg-transparent border-none outline-none w-full text-base bg-transparent text-[#828282] focus:text-black   ${meta.touched && meta.error && 'text-[#FB2525]'}`}
                        {...field}
                        {...props}
                        autoComplete="off"
                    />
                    {righticon}
                </div>
                <ErrorMessage component="small" name={field.name} className="text-[#FB2525] font-medium" />
            </div>
        </React.Fragment>
    );
};

export default InputField;
