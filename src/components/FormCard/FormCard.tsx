"use client";
import DeleteIcon from "@/assets/icons/DeleteIcon";
import ThreeDotsIcon from "@/assets/icons/ThreeDotsIcon";
import Logo from "@/assets/icons/Logo";
import { deleteFormById, getFormByFranchiseId } from "@/Redux/slices/formSlice";
import { AppDispatch } from "@/Redux/store/store";
import CardSkeleton from "@/shared/CardSkelton";
import Pagination from "@/shared/Pagination";
import { useParams, useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import CustomModal from "../Modal/DeleteModal";
import FormIcon from "@/assets/icons/FormIcon";
import EditIcon from "@/assets/icons/EditIcon";
import View2Icon from "@/assets/icons/View2Icon";

const FormCard = () => {
  const params = useParams();
  const router = useRouter();
  const dispatch = useDispatch<AppDispatch>();
  const locationId = params?.locationId;
  const businessId = params?.businessId;
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [isDeleteModalOpen, setDeleteModalOpen] = useState(false);
  const [deleteFormId, setDeleteFormId] = useState<string>("");
  const allForms = useSelector((state: any) => state?.reviewForm?.allForms);
  const isLoading = useSelector((state: any) => state?.reviewForm?.isLoading);
  const pageCount = Math.ceil(allForms?.totalRecords / 10);
  const singleFranchise = useSelector((state: any) => state?.service?.singleFranchise?.data);


  useEffect(() => {
    dispatch(getFormByFranchiseId({ locationId, currentPage }));
  }, [currentPage, locationId, dispatch]);

  const handlePageClick = (data: { selected: number }) => {
    setCurrentPage(data.selected);
  };

  const handleDeleteForm = (id: any) => {
    setDeleteFormId(id)
    setDeleteModalOpen(true);
  };

  const submitDeleteForm = (id: any) => {
    dispatch(deleteFormById({ deleteFormId, router, setDeleteModalOpen }))
    setDeleteModalOpen(true);
  };

  return (
    <div className="flex flex-col gap-4">
      <div className="flex items-center justify-between gap-6 flex-wrap">
        <div className="flex items-center gap-3  sm:flex-nowrap flex-wrap">
          <div className="bg-[#26A8F1] h-14 w-14 rounded-full flex items-center justify-center">
            <FormIcon />
          </div>
          <div className='flex flex-col'>
            <p className='text-sm font-normal max-w-lg text-[#8D8D8D]'>Forms by:</p>
            <h2 className='text-xl font-medium text-black capitalize'>Location</h2>
          </div>

        </div>
        <button
          onClick={() =>
            router.push(
              `/all-business/${params?.businessId}/${params?.locationId}/create-form`
            )
          }
          className="bg-black text-white py-3 px-4 rounded-full text-sm"
        >
          Create New Questionare
        </button>
      </div>
      {
        allForms?.data?.length > 0 ? <div>
          <div
            className={`${isLoading ? 'grid-cols-1' : 'grid-cols-1 md:grid-cols-2 gap-4 space-y-1'} grid `}
          >
            {isLoading ? <CardSkeleton length={4} /> :
              allForms?.data?.map((form: any) => (
                <div
                  key={form._id}
                >
                  <div
                    className="relative block px-6 py-4 border rounded-xl shadow-[0px_0px_60px_30px_#00000008] bg-white h-full"
                  >
                    <h3 className="text-2xl font-semibold">{form.name || 'Form Name'}</h3>
                    <ul className="list-disc pl-5 mt-2">
                      {form.questions.map((question: any) => (
                        <li key={question._id} className="font-normal">
                          {question.questionLabel}
                        </li>
                      ))}
                    </ul>
                    <div className="rounded-full absolute top-4 right-2">
                      <div className="relative group">
                        <button className="p-1">
                          <ThreeDotsIcon />
                        </button>
                        <div
                          className="absolute z-10 right-0 lg:left-1/2 lg:transform lg:-translate-x-1/2 hidden group-hover:block rounded-xl py-1 bg-white shadow-md w-max"
                        >
                          <button className="flex items-center gap-1 active:bg-gray-100 hover:bg-gray-100 px-2.5 py-1 w-full" onClick={() => router.push(`/all-business/${businessId}/${locationId}/${form._id}`)}>
                            <View2Icon />
                            <span className="text-sm"> View</span>
                          </button>
                          <button className="flex items-center gap-1 active:bg-gray-100 hover:bg-gray-100 px-3 py-1 w-full" onClick={() => router.push(`/all-business/${businessId}/${locationId}/${form._id}/edit`)}>
                            <EditIcon />
                            <span className="text-sm"> Edit</span>
                          </button>
                          <button className="flex items-center gap-1 active:bg-gray-100 hover:bg-gray-100 px-2.5 py-1 w-full" onClick={() => handleDeleteForm(form._id)}>
                            <DeleteIcon
                              width={20}
                              height={20} />
                            <span className="text-sm"> Delete</span>
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ))
            }
          </div>
          {pageCount > 1 && <div className='flex justify-center my-4'>
            <Pagination pageCount={pageCount} onPageChange={handlePageClick} currentPage={currentPage} />
          </div>}
        </div> :
          <div className="flex flex-col justify-center items-center min-h-52 bg-white rounded-xl gap-3 shadow-[0px_0px_60px_30px_#00000008]">
            <Logo />
            <h2 className="text-2xl">Oops! No Form Found</h2>
          </div>
      }
      <CustomModal
        isOpen={isDeleteModalOpen}
        onClose={() => setDeleteModalOpen(false)}
        heading="Delete Form"
      >
        <>
          <p>Are you sure you want to delete this form? This action cannot be undone, and all related data will be permanently removed.</p>
          <div className="flex items-center w-100 gap-3 mt-3">
            <button
              className={`border-black border rounded-xl py-2 max-w-64 w-full bg-white text-black`}
              onClick={() => setDeleteModalOpen(false)}
            >
              Cancel
            </button>
            <button
              className={`border-red-600 border rounded-xl py-2 max-w-64 w-full bg-red-600 text-white`}
              onClick={submitDeleteForm}
            >
              Delete
            </button>
          </div>
        </>
      </CustomModal>
    </div>
  );
};

export default FormCard;
