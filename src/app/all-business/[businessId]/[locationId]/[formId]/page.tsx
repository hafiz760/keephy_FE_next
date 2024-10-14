"use client";
import React, { useEffect } from "react";
import { useParams, useRouter } from "next/navigation";
import AuthHeadings from "@/shared/AuthHeadings";
import BackIcon from "@/assets/icons/backIcon";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch } from "@/Redux/store/store";
import { getFormById } from "@/Redux/slices/formSlice";
import { IconDisplay } from "@/shared/FormInputIcon";
import RatingInput from "@/components/TypeForm/RatingInput";
import withAuthValidation from "@/hoc/withAuth";
import FormIcon from "@/assets/icons/FormIcon";
import Logo from "@/assets/icons/Logo";


const FormPage = () => {
  const params = useParams();
  const router = useRouter();
  const formId = params?.formId;
  const formData = useSelector(
    (state: any) => state?.reviewForm?.singleform?.data
  );
  const dispatch = useDispatch<AppDispatch>();
  useEffect(() => {
    dispatch(getFormById({ formId }));
  }, [formId, dispatch]);
  const businessId = params?.businessId;
  const locationId = params?.locationId;

  return (
    <>
      <main className="container gradient-bg">
        <button
          className="text-[#1191D9] font-semibold text-base cursor-pointer mb-4 flex items-center gap-1"
          onClick={() => router.back()}
        >
          <BackIcon /> Go Back
        </button>
        <div className="flex flex-col gap-4">
          <div className="flex items-center justify-between gap-6 flex-wrap">
            <div className="flex items-center gap-3  sm:flex-nowrap flex-wrap">
              <div className="bg-[#26A8F1] h-14 w-14 rounded-full flex items-center justify-center">
                <FormIcon />
              </div>
              <AuthHeadings
                heading={formData?.name}
                description={
                  "Here is the form you’ve created. Review it or create a new form to gather the information you need."
                }
                business
              />
            </div>
            <div className="flex itemx-center gap-3 flex-wrap">
              <button
                className="bg-black text-white py-3 px-4 rounded-full text-sm"
                onClick={() =>
                  router.push(
                    `/all-business/${businessId}/${locationId}/${formId}/formSubmission`
                  )
                }
              >
                View Form Submissions
              </button>
            </div>
          </div>
        </div>

        <div className="p-6 overflow-y-auto bg-white shadow-[0px_0px_60px_30px_#00000008] w-full rounded-xl mt-6">
          <div className="flex flex-col divide-y-[1px] divide-[#0F0F0F]">
            {formData?.questions?.length > 0 ?
              formData?.questions?.map((form: any, index: any) => (
                <div
                  key={index}
                  className="flex items-center justify-between gap-4 w-full py-5 last:pb-0 first:pt-0"
                >
                  <div className="flex gap-3 w-full">
                    {form?.questionType === "shortText" && (
                      <>
                        <button className="bg-black text-white hover:bg-grey rounded-full h-10 w-10 flex items-center justify-center flex-shrink-0">
                          <IconDisplay inputType={form.questionType} />
                        </button>
                        <div className="w-full">
                          <div className="w-full max-w-md">
                            <p className="text-black text-lg mb-1">
                              {form.questionLabel || ""}
                            </p>
                            <input
                              type="text"
                              className="border border-[#EDEDED] h-14 p-4 rounded-xl w-full text-lg opacity-50 outline-none"
                              placeholder="Type your answer here..."
                              readOnly
                            />
                          </div>
                        </div>
                      </>
                    )}
                    {form?.questionType === "longText" && (
                      <>
                        <button className="bg-black text-white hover:bg-grey rounded-full h-10 w-10 flex items-center justify-center flex-shrink-0">
                          <IconDisplay inputType={form.questionType} />
                        </button>
                        <div className="w-full">
                          <div className="w-full max-w-md">
                            <p className="text-black text-lg mb-1">
                              {form.questionLabel || ""}
                            </p>
                            <textarea
                              className={`border border-[#EDEDED] p-4 rounded-xl outline-none resize-none opacity-50 w-full text-lg bg-transparent text-[#828282] focus:text-black}`}
                              autoComplete="off"
                              rows={1}
                              readOnly
                              placeholder="Type your answer here..."
                            />
                          </div>
                        </div>
                      </>
                    )}

                    {form?.questionType === "dropdown" && (
                      <>
                        <button className="bg-black text-white hover:bg-grey rounded-full h-10 w-10 flex items-center justify-center flex-shrink-0">
                          <IconDisplay inputType={form.questionType} />
                        </button>
                        <div className="w-full">
                          <div className="w-full max-w-md">
                            <p className="text-black text-lg mb-1">
                              {form.questionLabel || ""}
                            </p>
                            <textarea
                              className="outline-none resize-none w-full text-lg h-auto opacity-50 bg-transparent text-[#828282] focus:text-black bg-white border border-[#EDEDED] p-2 rounded-xl"
                              autoComplete="off"
                              rows={3}
                              defaultValue={form?.options?.join("\n") || ""}
                            />
                          </div>
                        </div>
                      </>
                    )}

                    {form?.questionType === "multipleChoice" && (
                      <>
                        <button className="bg-black text-white hover:bg-grey rounded-full h-10 w-10 flex items-center justify-center flex-shrink-0">
                          <IconDisplay inputType={form.questionType} />
                        </button>
                        <div className="w-full">
                          <div className="w-full max-w-md">
                            <p className="text-black text-lg mb-1">
                              {form.questionLabel || ""}
                            </p>
                            <textarea
                              className="outline-none resize-none w-full text-lg opacity-50 h-auto bg-transparent text-[#828282] focus:text-black bg-white border border-[#EDEDED] p-2 rounded-xl"
                              autoComplete="off"
                              rows={3}
                              defaultValue={form?.choices?.join("\n") || ""}
                              readOnly
                            />
                          </div>
                        </div>
                      </>
                    )}
                    {form?.questionType === "yesno" && (
                      <>
                        <button className="bg-black text-white hover:bg-grey rounded-full h-10 w-10 flex items-center justify-center flex-shrink-0">
                          <IconDisplay inputType={form.questionType} />
                        </button>
                        <div className="w-full">
                          <div className="w-full max-w-md">
                            <p className="text-black text-lg mb-1">
                              {form.questionLabel || ""}
                            </p>
                            <div className="flex flex-col gap-2">
                              <button
                                disabled
                                className="border-black border hover:bg-gray-50 disabled:opacity-50 transition-colors rounded-xl py-2 max-w-64 w-full"
                              >
                                Yes
                              </button>
                              <button
                                disabled
                                className="border-black border hover:bg-gray-50 disabled:opacity-50 transition-colors rounded-xl py-2 max-w-64 w-full"
                              >
                                No
                              </button>
                            </div>
                          </div>
                        </div>
                      </>
                    )}

                    {form?.questionType === "rating" && (
                      <>
                        <button className="bg-black text-white hover:bg-grey rounded-full h-10 w-10 flex items-center justify-center flex-shrink-0">
                          <IconDisplay inputType={form.questionType} />
                        </button>
                        <div className="w-full">
                          <div className="w-full max-w-md">
                            <p className="text-black text-lg mb-1">
                              {form.questionLabel || ""}
                            </p>
                            <RatingInput
                              iconSize={24}
                              label={""}
                              value={form.ratingData.maxRating as number}
                            />
                          </div>
                        </div>
                      </>
                    )}
                  </div>
                </div>
              )) :
              <div className="flex flex-col justify-center items-center min-h-52  gap-3">
                <Logo />
                <h2 className='text-2xl font-primary'>No Form Data Found</h2>
              </div>
            }
          </div>
        </div>

      </main>
      ;
    </>
  );
};

export default withAuthValidation(FormPage);
