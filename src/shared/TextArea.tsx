import React from "react";
import { ErrorMessage, useField } from "formik";

interface TextAreaProps {
  name: string;
  placeholder?: string;
  business?: boolean;
  rows?: number
}

const TextArea: React.FC<TextAreaProps> = ({
  business,
  rows,
  ...props
}) => {
  const [field, meta] = useField(props);
  return (
    <React.Fragment>
      <div className="flex flex-col gap-1">
        <div
          className={`bg-white gap-2 border border-[#EDEDED] p-4 rounded-xl ${business ? "w-full" : "md:min-w-72"
            }`}
        >
          <textarea
            className={`border-none outline-none resize-none w-full text-base bg-transparent text-[#828282] focus:text-black   ${meta.touched && meta.error && "text-[#FB2525]"
              }`}
            {...field}
            {...props}
            autoComplete="off"
            rows={rows}
          />
        </div>
        <ErrorMessage
          component="small"
          name={field.name}
          className="text-[#FB2525] font-medium"
        />
      </div>
    </React.Fragment>
  );
};

export default TextArea;
