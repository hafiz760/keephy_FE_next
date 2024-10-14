import { useParams, useRouter } from "next/navigation";
import React, { useRef, useState } from "react";

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  formData: any;
}

const FormCreatedModal: React.FC<ModalProps> = ({
  isOpen,
  onClose,
  formData,
}) => {
  const params = useParams();
  const router = useRouter();
  const [copied, setCopied] = useState<boolean>(false);
  const inputRef = useRef<HTMLInputElement>(null);
  const handleCopy = async () => {
    if (inputRef.current) {
      try {
        await navigator.clipboard.writeText(inputRef.current.value);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000); // Reset after 2 seconds
      } catch (err) {
        console.error("Failed to copy text: ", err);
      }
    }
  };
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center z-50 ">
      <div
        className="fixed inset-0 bg-black bg-opacity-50"
        onClick={onClose}
      ></div>
      <div className="relative bg-white shadow-lg overflow-hidden w-11/12 max-w-md z-10 rounded-[1.5rem]">
        <div className="flex justify-between items-center pl-6 pr-4 py-4 border-b border-[#D9D9D9]">
          <h2 className="text-xl font-semibold">
            Your form has been published! 🎉
          </h2>
          <button
            className=" right-2 text-gray-500 hover:text-gray-700"
            onClick={onClose}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth="2"
              stroke="currentColor"
              className="w-6 h-6"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </button>
        </div>
        <div className="p-6 flex flex-col gap-5">
          <div
            className={`flex items-center bg-white justify-between gap-2 border border-[#EDEDED] h-14 py-4 pl-4 pr-2 rounded-xl`}
          >
            <input
              ref={inputRef}
              className={` border-none outline-none w-full text-base bg-transparent text-black`}
              type="text"
              value={`${process.env.NEXT_PUBLIC_URL_LOCAL}all-forms/${formData?.Form?._id}`}
              readOnly
            />
            <button
              className="bg-black p-2 text-sm rounded-lg text-white text-nowrap"
              onClick={handleCopy}
            >
              {copied ? "Copied" : "Copy link"}
            </button>
          </div>
          <div className="relative border-t border-[#C6C6C6] w-full mt-4">
            <span className="bg-white px-2.5 rounded-full text-sm font-medium text-[#C6C6C6] absolute left-1/2 -top-1/2 -translate-y-1/2 -translate-x-1/2">
              OR
            </span>
          </div>
          <button
            className="text-[#1191D9] font-semibold mt-2"
            onClick={() =>
              router.push(`${process.env.NEXT_PUBLIC_URL_LOCAL}all-forms`)
            }
          >
            See all forms
          </button>
        </div>
      </div>
    </div>
  );
};

export default FormCreatedModal;
