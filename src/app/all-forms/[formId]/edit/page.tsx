"use client";
import React, { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import BackIcon from "@/assets/icons/backIcon";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch } from "@/Redux/store/store";
import { editForm, getFormById } from "@/Redux/slices/formSlice";
import { IconDisplay } from "@/shared/FormInputIcon";
import RatingInput from "@/components/TypeForm/RatingInput";
import withAuthValidation from "@/hoc/withAuth";
import FormIcon from "@/assets/icons/FormIcon";
import DeleteIcon from "@/assets/icons/DeleteIcon";
import YesNoButtonGroup from "@/shared/ReviewFormYesNo";
import ShortTextInput from "@/shared/ReviewFormShortText";
import LongTextInput from "@/shared/ReviewFormLongText";
import DropdownInput from "@/shared/ReviewFormDropdown";
import McqsInput from "@/shared/ReviewFormMcqs";
import LoaderIcon from "@/assets/icons/LoaderIcon";

interface InputField {
  id: number;
  questionType:
  | "rating"
  | "yesno"
  | "dropdown"
  | "multipleChoice"
  | "shortText"
  | "longText";
  questionLabel: string;
  value: string | number;
  options?: string[];
  ratings?: number | string;
  choices?: string[];
}

type Question =
  | {
    questionLabel: string;
    questionType:
    | "shortText"
    | "longText"
    | "yesno"
    | "dropdown"
    | "multipleChoice";
  }
  | {
    questionLabel: string;
    questionType: "rating";
    ratingData: {
      minRating: number;
      maxRating: number | string;
    };
  };

const FormPage = () => {
  const params = useParams();
  const router = useRouter();
  const dispatch = useDispatch<AppDispatch>();
  const formId = params?.formId;
  const formData = useSelector(
    (state: any) => state?.reviewForm?.singleform?.data
  );
  const [inputs, setInputs] = useState<InputField[]>([]);
  const [formName, setFormName] = useState<string>("");
  const isLoading = useSelector((state: any) => state?.reviewForm?.isLoading);

  useEffect(() => {
    if (formData && formData?.questions?.length > 0) {
      const filteredQuestions = formData?.questions?.map((question: any) => ({
        id: question._id,
        questionType: question.questionType,
        questionLabel: question.questionLabel,
        value: question?.value,
        ratings: question?.ratingData?.maxRating,
        options: question?.options,
        choices: question?.choices
      }));
      setInputs(filteredQuestions);
      setFormName(formData?.name)
    }
  }, [formData]);

  useEffect(() => {
    dispatch(getFormById({ formId }));
  }, [formId, dispatch]);

  const handleLabelChange = (id: number, label: string) => {
    setInputs(
      inputs.map((input) => (input.id === id ? { ...input, questionLabel: label } : input))
    );
  };

  const handleInputChange = (
    id: number,
    value?: string | number,
    ratings?: number | string
  ) => {
    setInputs(
      inputs.map((input) => {
        if (input.id === id) {
          if (input.questionType === "rating" && ratings !== undefined) {
            return {
              ...input,
              ratings: ratings,
            };
          } else {
            return {
              ...input,
              value: value ?? input.value,
            };
          }
        }
        return input;
      })
    );
  };

  const handleEditSubmit = (e: any) => {
    e.preventDefault();
    const splitAndFilter = (str: any) =>
      (str ?? "").split("\n").filter((option: any) => option.trim() !== "");
    const formData = {
      businessId: params?.businessId,
      name: formName,
      questions: inputs.map<Question>((input) => {
        if (input.questionType === "rating") {
          return {
            questionLabel: input.questionLabel,
            questionType: input.questionType,
            ratingData: {
              minRating: 1,
              maxRating: typeof input.ratings === "number" ? input.ratings : 5,
            },
          };
        } else if (input.questionType === "dropdown") {
          return {
            questionLabel: input.questionLabel,
            questionType: input.questionType,
            options: input.value ? splitAndFilter(input.value) : input.options,
          };
        } else if (input.questionType === "multipleChoice") {
          return {
            questionLabel: input.questionLabel,
            questionType: input.questionType,
            choices: input.value ? splitAndFilter(input.value) : input.choices,
          };
        } else {
          return {
            questionLabel: input.questionLabel,
            questionType: input.questionType,
          };
        }
      }),
    };

    dispatch(editForm({ formData, router, formId }));
  };
  return (
    <>
      <main className="container gradient-bg">
        <button
          className="text-[#1191D9] font-semibold text-base cursor-pointer mb-4 flex items-center gap-1"
          onClick={() => router.back()}
        >
          <BackIcon /> Go Back
        </button>
        <div className="flex flex-col gap-4 mb-4">
          <div className="flex items-center gap-3  sm:flex-nowrap flex-wrap">
            <div className="bg-[#26A8F1] h-14 w-14 rounded-full flex items-center justify-center">
              <FormIcon />
            </div>
            <div className="flex flex-col items-start">
              <input required value={formName} onChange={(e) => setFormName(e.target.value)} type="text" placeholder="Enter Form Name" name='name' className="border-none w-full bg-transparent text-[#828282] focus:text-black outline-none sm:text-3xl text-2xl font-medium placeholder:text-[#828282]" />
              <p className={`text-sm font-normal max-w-lg text-[#8D8D8D]`}>Edit content.</p>
            </div>
          </div>
        </div>

        <form onSubmit={handleEditSubmit}>
          <div className="sm:p-6 p-4 overflow-y-auto bg-white shadow-[0px_0px_60px_30px_#00000008] w-full rounded-xl">
            <div className="w-full">
              <div className="flex flex-col divide-y-[1px] divide-[#0F0F0F]">
                {(inputs || [])?.map((input: any, index: any) => (
                  <div key={index} className="flex items-start justify-between gap-4 w-full py-5 last:pb-0 first:pt-0">
                    <button
                      className="bg-black text-white hover:bg-grey rounded-full h-10 w-10 flex items-center justify-center flex-shrink-0"
                    >
                      <IconDisplay inputType={input.questionType} />
                    </button>
                    <div className="w-full">
                      <div className="w-full max-w-md">
                        <input
                          required
                          type="text"
                          defaultValue={input.questionLabel}
                          // value={input.questionLabel}
                          onChange={(e) => handleLabelChange(input.id, e.target.value)}
                          placeholder={`Type your question here...`}
                          className="mb-2 pb-2 border-b border-[#EDEDED] w-full text-[#828282] focus:border-black focus:text-black outline-none text-lg"
                        />
                        {input.questionType === "rating" && (
                          <>
                            <p className="text-[#1191D9] text-sm mb-1">
                              Select rating range
                            </p>
                            <RatingInput
                              iconSize={24}
                              label={""}
                              name={`rating-${input.id}`}
                              value={input.ratings as number}
                              onChange={(name, value) =>
                                handleInputChange(
                                  input.id,
                                  undefined,
                                  value
                                )
                              }
                            />
                          </>
                        )}
                        {input.questionType === "yesno" && (
                          <YesNoButtonGroup readOnly={true} />
                        )}
                        {input.questionType === "shortText" && (
                          <ShortTextInput
                            type="shortText"
                            placeholder="Type your answer here..."
                            readOnly={true}
                          />
                        )}
                        {input.questionType === "longText" && (
                          <LongTextInput
                            rows={1}
                            type="longText"
                            placeholder="Type your answer here..."
                            readOnly={true}

                          />
                        )}
                        {input.questionType === "dropdown" && (
                          <DropdownInput
                            formType="create"
                            rows={3}
                            id={input.id}
                            required
                            type={input.questionType}
                            defaultValue={input.options.join('\n') as string}
                            // value={input.options.join('\n') as string}
                            handleInputChange={handleInputChange}
                            placeholder="Add choices"
                            note="Write or paste your options below. Each option
                                    must be on a separate line."

                          />
                        )}
                        {input.questionType === "multipleChoice" && (
                          <McqsInput
                            formType="create"
                            rows={3}
                            id={input.id}
                            required
                            defaultValue={input.choices.join('\n') as string}
                            type={input.questionType}
                            // value={input.choices.join('\n') as string}
                            handleInputChange={handleInputChange}
                            placeholder="Add choices"
                            note="Write or paste your choices below. Each choice
                                    must be on a separate line."
                          />
                        )}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
          {formData?.questions?.length > 0 &&
            <div className="flex items-center justify-center mt-6">
              <button
                disabled={isLoading}
                type="submit"
                className=" bg-black text-white h-14 max-w-80 w-full rounded-full"
              >
                {isLoading ? <LoaderIcon /> : "Update Form"}
              </button>
            </div>
          }
        </form>

      </main>
      ;
    </>
  );
};

export default withAuthValidation(FormPage);
