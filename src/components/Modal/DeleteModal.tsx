import React from 'react';
import CloseIcon from "@/assets/icons/CloseIcon"

interface ModalProps {
    isOpen: boolean;
    onClose: () => void;
    children: any;
    heading: string;
}

const CustomModal: React.FC<ModalProps> = ({
    isOpen,
    onClose,
    children,
    heading
}) => {

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 flex items-center justify-center z-50 ">
            <div
                className="fixed inset-0 bg-black bg-opacity-50"
                onClick={onClose}
            ></div>
            <div className="relative bg-white shadow-lg overflow-hidden w-11/12 max-w-md z-10 rounded-xl">
                <div className='flex justify-between items-center pl-6 pr-4 py-4 border-b border-[#D9D9D9]'>
                    <h2 className="text-xl font-semibold ">{heading}</h2>
                    <button
                        className=" right-2 text-gray-500 hover:text-gray-700"
                        onClick={onClose}
                    >
                        <CloseIcon />
                    </button>
                </div>
                <div className="p-6 flex flex-col gap-3">
                    {children}
                </div>
            </div>
        </div>
    );
};

export default CustomModal;
