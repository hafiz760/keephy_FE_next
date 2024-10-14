"use client";
import React, { useState } from "react";
import RatingInput from "@/components/TypeForm/RatingInput";
import FormIcon from "@/assets/icons/FormIcon";
import BackIcon from "@/assets/icons/backIcon";
import { useParams, useRouter } from "next/navigation";
import Logo from "@/assets/icons/Logo";
import DeleteIcon from "@/assets/icons/DeleteIcon";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch } from "@/Redux/store/store";
import { postForm } from "@/Redux/slices/formSlice";
import LoaderIcon from "@/assets/icons/LoaderIcon";
import FormCreatedModal from "@/components/Modal/FormCreatedModal";
import { IconDisplay } from "@/shared/FormInputIcon";
import withAuthValidation from "@/hoc/withAuth";
import ShortTextInput from "@/shared/ReviewFormShortText";
import LongTextInput from "@/shared/ReviewFormLongText";
import YesNoButtonGroup from "@/shared/ReviewFormYesNo";
import McqsInput from "@/shared/ReviewFormMcqs";
import DropdownInput from "@/shared/ReviewFormDropdown";
import { toast } from "react-toastify";

const inputTypes = [
  {
    name: "Rating",
    type: "rating",
    icon: <IconDisplay inputType={"rating"} />,
  },
  {
    name: "Yes/No",
    type: "yesno",
    icon: <IconDisplay inputType={"yesno"} />,
  },
  {
    name: "Dropdown",
    type: "dropdown",
    icon: <IconDisplay inputType={"dropdown"} />,
  },
  {
    name: "Multiple Choice",
    type: "multipleChoice",
    icon: <IconDisplay inputType={"multipleChoice"} />,
  },
  {
    name: "Short Text",
    type: "shortText",
    icon: <IconDisplay inputType={"shortText"} />,
  },
  {
    name: "Long Text",
    type: "longText",
    icon: <IconDisplay inputType={"longText"} />,
  },
];
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

interface InputField {
  id: number;
  type:
  | "rating"
  | "yesno"
  | "dropdown"
  | "multipleChoice"
  | "shortText"
  | "longText";
  label: string;
  value: string | number;
  options?: string[];
  ratings?: number | string;
  choices?: string[];
  isRequired: boolean;
}

const Switch = ({ isOn, onChange }: { isOn: boolean; onChange: () => void }) => {
  return (
    <div className="flex items-center gap-2">
      <span className="text-sm">Required</span>
      <label className="inline-flex items-center cursor-pointer" onClick={(e) => e.stopPropagation()}>
        <input type="checkbox" value="" className="sr-only peer" checked={isOn} onChange={(e) => onChange()} />
        <div className="relative w-11 h-6 bg-gray-200 rounded-full peer peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-0.5 after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-black"></div>
      </label>
    </div>
  )
}

function Page() {
  const [inputs, setInputs] = useState<InputField[]>([]);
  const [form, setForm] = useState<object>();
  const [isModalOpen, setModalOpen] = useState(false);
  const [formName, setFormName] = useState<string>("");
  const router = useRouter();
  const isLoading = useSelector((state: any) => state?.reviewForm?.isLoading);
  const dispatch: AppDispatch = useDispatch();

  const handleAddInput = (
    type:
      | "rating"
      | "yesno"
      | "dropdown"
      | "multipleChoice"
      | "shortText"
      | "longText"
  ) => {
    setInputs([
      ...inputs,
      { id: Date.now(), type, label: "", value: "", ratings: "", isRequired: false },
    ]);
  };

  const handleRemoveInput = (id: number) => {
    setInputs(inputs.filter((input) => input.id !== id));
  };

  const handleInputChange = (
    id: number,
    value?: string | number,
    ratings?: number | string
  ) => {
    setInputs(
      inputs.map((input) => {
        if (input.id === id) {
          if (input.type === "rating" && ratings !== undefined) {
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

  const handleLabelChange = (id: number, label: string) => {
    setInputs(
      inputs.map((input) => (input.id === id ? { ...input, label } : input))
    );
  };

  const handleRequireChange = (id: number, isRequired: boolean) => {
    setInputs(
      inputs.map((input) => (input.id === id ? { ...input, isRequired: !isRequired } : input))
    );
  };

  const CreateForm = (e: any) => {
    e.preventDefault();
    if (!formName) {
      toast.error("Please Enter Form Name")
      return
    }
    const formData = {
      name: formName,
      questions: inputs.map<Question>((input) => {
        if (input.type === "rating") {
          return {
            isRequired: input.isRequired,
            questionLabel: input.label,
            questionType: input.type,
            ratingData: {
              minRating: 1,
              maxRating: typeof input.ratings === "number" ? input.ratings : 5,
            },
          };
        } else if (input.type === "dropdown") {
          return {
            isRequired: input.isRequired,
            questionLabel: input.label,
            questionType: input.type,
            options: (input.value as string)
              .split("\n")
              .filter((option: string) => option.trim() !== ""),
          };
        } else if (input.type === "multipleChoice") {
          return {
            isRequired: input.isRequired,
            questionLabel: input.label,
            questionType: input.type,
            choices: (input.value as string)
              .split("\n")
              .filter((option: string) => option.trim() !== ""),
          };
        } else {
          return {
            isRequired: input.isRequired,
            questionLabel: input.label,
            questionType: input.type,
          };
        }
      }),
    };

    dispatch(postForm({ formData, setForm, setModalOpen, setInputs }));
  };
  return (
    <main className="container gradient-bg">
      <button
        className="text-[#1191D9] font-semibold text-base cursor-pointer mb-4 flex items-center gap-1"
        onClick={() => router.back()}
      >
        <BackIcon /> Go Back
      </button>
      <div className="flex flex-col gap-4">
        <div className="flex items-center gap-3 sm:flex-nowrap flex-wrap">
          <div className="bg-[#26A8F1] h-14 w-14 rounded-full flex items-center justify-center">
            <FormIcon />
          </div>
          <div className="flex flex-col items-start">
            <input required value={formName} onChange={(e) => setFormName(e.target.value)} type="text" placeholder="Enter Form Name" name='name' className="border-none w-full bg-transparent text-[#828282] focus:text-black outline-none sm:text-3xl text-2xl font-medium placeholder:text-[#828282]" />
            <p className={`text-sm font-normal max-w-lg text-[#8D8D8D]`}>Choose from the available options to add content.</p>
          </div>
        </div>
      </div>
      <div className="flex flex-col gap-6 mt-6">
        <div className="w-full transition-colors  overflow-hidden  height-[600px]">
          <div className="flex items-center gap-4 overflow-x-auto no-scrollbar">
            {inputTypes.map((inputs: any, index: number) => {
              return (
                <button
                  key={index}
                  onClick={() => handleAddInput(inputs.type)}
                  className="bg-black text-white  hover:bg-grey text-grey-darkest py-2 px-4 rounded-full inline-flex items-center gap-2 shrink-0"
                >
                  {inputs.icon}
                  <span>{inputs.name}</span>
                </button>
              );
            })}
          </div>
        </div>

        <form onSubmit={CreateForm}>
          <div className="sm:p-6 p-4 overflow-y-auto bg-white shadow-[0px_0px_60px_30px_#00000008] w-full rounded-xl">
            <div className="w-full">
              {
                inputs.length > 0 ?
                  <div className="flex flex-col divide-y-[1px] divide-[#0F0F0F]">
                    {inputs.map((input) => (
                      <div key={input.id} className="flex items-start justify-between gap-4 w-full py-5 last:pb-0 first:pt-0">
                        <div className="flex gap-3 w-full">
                          <div className="flex flex-col items-center gap-4">
                            <button
                              className="bg-black text-white hover:bg-grey rounded-full h-10 w-10 flex items-center justify-center flex-shrink-0"
                            >
                              <IconDisplay inputType={input.type} />
                            </button>
                            <button
                              className="sm:hidden block"
                              onClick={() => handleRemoveInput(input.id)}
                            >
                              <DeleteIcon width={24}
                                height={24} />
                            </button>
                          </div>
                          <div className="w-full">
                            <div className="w-full max-w-md">
                              <input
                                required
                                type="text"
                                value={input.label}
                                onChange={(e) => handleLabelChange(input.id, e.target.value)}
                                placeholder={`Type your question here...`}
                                className="mb-2 pb-2 border-b border-[#EDEDED] w-full text-[#828282] focus:border-black focus:text-black outline-none text-lg"
                              />
                              {input.type === "rating" && (
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
                              {input.type === "yesno" && (
                                <YesNoButtonGroup readOnly={true} />
                              )}
                              {input.type === "shortText" && (
                                <ShortTextInput
                                  type="shortText"
                                  placeholder="Type your answer here..."
                                  readOnly={true}
                                />
                              )}
                              {input.type === "longText" && (
                                <LongTextInput
                                  rows={1}
                                  type="longText"
                                  placeholder="Type your answer here..."
                                  readOnly={true}

                                />
                              )}
                              {input.type === "dropdown" && (
                                <DropdownInput
                                  formType="create"
                                  rows={3}
                                  id={input.id}
                                  required
                                  type={input.type}
                                  value={input.value as string}
                                  handleInputChange={handleInputChange}
                                  placeholder="Add choices"
                                  note="Write or paste your options below. Each option
                                    must be on a separate line."

                                />
                              )}
                              {input.type === "multipleChoice" && (
                                <McqsInput
                                  formType="create"
                                  rows={3}
                                  id={input.id}
                                  required
                                  type={input.type}
                                  value={input.value as string}
                                  handleInputChange={handleInputChange}
                                  placeholder="Add choices"
                                  note="Write or paste your choices below. Each choice
                                    must be on a separate line."
                                />
                              )}
                            </div>
                          </div>
                        </div>
                        <div className="flex items-center gap-4">
                          <Switch
                            isOn={input.isRequired}
                            onChange={() => handleRequireChange(input.id, input.isRequired)}
                          />
                          <button
                            className="sm:block hidden"
                            onClick={() => handleRemoveInput(input.id)}
                          >
                            <DeleteIcon width={32}
                              height={32} />
                          </button>
                        </div>
                      </div>
                    ))}
                  </div> : <div className="flex flex-col justify-center items-center min-h-52 rounded-xl gap-3">
                    <Logo />
                    <h2 className='text-2xl font-primary'>No Content Added Yet</h2>
                  </div>
              }
            </div>
          </div>
          {inputs.length > 0 &&
            <div className="flex items-center justify-center mt-6">
              <button
                disabled={isLoading}
                type="submit"
                className=" bg-black text-white h-14 max-w-80 w-full rounded-full"
              >
                {isLoading ? <LoaderIcon /> : "Publish Form"}
              </button>
            </div>
          }
        </form>

        <FormCreatedModal
          isOpen={isModalOpen}
          onClose={() => setModalOpen(false)}
          formData={form}
        />
      </div>
    </main >
  );
}

export default withAuthValidation(Page);
