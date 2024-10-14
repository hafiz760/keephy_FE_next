import React, { ReactNode } from "react";
import { ErrorMessage, useField } from "formik";

interface Choice {
  value: string;
  option: string;
}

interface SelectFieldProps<T extends Choice> {
  icon?: ReactNode;
  name: string;
  defaultText?: string;
  choices?: Array<T>;
  onChange?: (selectedValue: T['value']) => void;
}

const SelectField = <T extends Choice>({
  icon,
  defaultText = "Select an option",
  choices = [],
  onChange,
  ...props
}: SelectFieldProps<T>) => {
  const [field, meta] = useField(props);

  return (
    <React.Fragment>
      <div className="flex flex-col gap-1">
        <div
          className={`flex items-center bg-white justify-between gap-2 border border-[#EDEDED] h-14  rounded-xl`}
        >
          <select
            className={`border-none outline-none w-full text-base bg-transparent text-[#828282] focus:text-black py-4 ps-4 pe-8`}

            {...field}
            {...props}
            onChange={(e) => {
              field.onChange(e);
              if (onChange) {
                onChange(e.target.value);
              }
            }}
          >
            <option value="">{defaultText}</option>
            {choices.map((choice, index) => (
              <option key={index} value={choice.value}>
                {choice.option}
              </option>
            ))}
          </select>
          {icon}
        </div>
        <ErrorMessage component="small" name={field.name} className="text-[#FB2525] font-medium" />

      </div>
    </React.Fragment>
  );
};

export default SelectField;
