"use client";
import Logo from "@/assets/icons/Logo";
import ArrowDown from "@/assets/icons/arrow-down.svg";

import { getFormSubmissionByFormId } from "@/Redux/slices/formSlice";
import { getFranchiseByBusinessId } from "@/Redux/slices/serviceSlice";
import { AppDispatch } from "@/Redux/store/store";
import CardSkeleton from "@/shared/CardSkelton";
import Pagination from "@/shared/Pagination";
import { useParams } from "next/navigation";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Select from 'react-select';
import Image from "next/image";

const styles = {
  option: (provided: any, state: any) => ({
    ...provided,
    backgroundColor: state.isSelected
      ? '#26A8F1'
      : state.isFocused
        ? '#f0f0f0'
        : '#fff',
    color: state.isSelected
      ? '#fff'
      : state.isFocused
        ? '#333'
        : '#000',
    fontSize: "14px"
  }),
}

const FormSubmissionCard = () => {
  const params = useParams();
  const formId = params?.formId;
  const dispatch = useDispatch<AppDispatch>();
  const [openAccordion, setOpenAccordion] = useState<string | null>(null);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const isLoading = useSelector((state: any) => state?.reviewForm?.isLoading);
  const allForms = useSelector(
    (state: any) => state?.reviewForm?.allFormsSubmissions?.data
  );
  const allFormsSubmission = useSelector(
    (state: any) => state?.reviewForm?.allFormsSubmissions
  );
  const pageCount = Math.ceil(allFormsSubmission?.totalRecords / 10);

  // Filters data
  const allBusiness = useSelector((state: any) => state?.service?.allBusiness);
  const allFranchise = useSelector((state: any) => state?.service?.allFranchiseByBusiness);

  const [formattedBusiness, setFormattedBusiness] = useState<{ value: string; label: string }[]>([]);
  const [selectedBusiness, setSelectedBusiness] = useState<{ value: string; label: string } | null>(null);
  const [formattedLocations, setFormattedLocations] = useState<{ value: string; label: string }[]>([]);
  const [selectedLocation, setSelectedLocation] = useState<{ value: string; label: string } | null>(null);

  // Format business data into the select options
  useEffect(() => {
    if (allBusiness?.data?.docs) {
      const tempCategory = allBusiness.data.docs.map((data: any) => {
        return { value: data._id, label: data.name };
      });
      setFormattedBusiness(tempCategory);
    }
  }, [allBusiness]);

  // Fetch locations (franchise data) based on selected business
  useEffect(() => {
    if (selectedBusiness?.value) {
      const businessId = selectedBusiness.value;
      dispatch(getFranchiseByBusinessId({ businessId }));
    }
  }, [dispatch, selectedBusiness]);

  // Update locations when franchises are loaded
  useEffect(() => {
    if (allFranchise?.Franchise) {
      const tempLocations = allFranchise.Franchise.map((data: any) => {
        return { value: data._id, label: data.address };
      });
      setFormattedLocations(tempLocations);
    }
  }, [allFranchise]);

  // Fetch Form Submission based on FormId
  useEffect(() => {
    dispatch(getFormSubmissionByFormId({ formId, currentPage, selectedBusiness: selectedBusiness?.value, selectedLocation: selectedLocation?.value }));
  }, [dispatch, currentPage, formId, selectedBusiness, selectedLocation]);

  const handlePageClick = (data: { selected: number }) => {
    setCurrentPage(data.selected);
  };

  const toggleAccordion = (id: string) => {
    setOpenAccordion(openAccordion === id ? null : id);
  };

  return (
    <div className="mt-4">
      <div className="flex items-center gap-3 justify-end flex-wrap">
        <Select
          closeMenuOnSelect={true}
          components={{ DropdownIndicator: null }}
          isClearable
          options={formattedBusiness}
          placeholder="Filter By Business"
          className="react-select-container filter"
          classNamePrefix="react-select"
          menuShouldBlockScroll={false}
          value={selectedBusiness}
          menuShouldScrollIntoView={true}
          onChange={(newValue) => {
            setSelectedBusiness(newValue);
            if (newValue === null) {
              setSelectedLocation(null)
            }
          }}
          styles={styles}
        />
        <Select
          closeMenuOnSelect={true}
          components={{ DropdownIndicator: null }}
          isClearable
          value={selectedLocation}
          options={formattedLocations}
          placeholder="Filter By Location"
          className="react-select-container filter"
          classNamePrefix="react-select"
          isDisabled={!selectedBusiness}
          menuShouldBlockScroll={false}
          menuShouldScrollIntoView={true}
          onChange={(newValue) => {
            setSelectedLocation(newValue);
            if (newValue === null) {
              setSelectedLocation(null)
            }
          }}
          styles={styles}
        />
      </div>
      <div className="mt-4">
        {isLoading ? (
          <CardSkeleton length={4} />
        ) : allForms?.length > 0 ? (
          <div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {allForms?.map((form: any) => (
                <div key={form._id}>
                  <div className="block px-5 py-4 border rounded-xl shadow-[0px_0px_60px_30px_#00000008] bg-white h-full">
                    <div className="mb-2">
                      <h5 className="text-xl font-semibold">User Details</h5>
                      <span className="font-normal text-base">
                        <span className="font-primary py-2 font-medium">Email:</span>{" "}
                        {form.email}
                        <br />
                        <span className="font-primary py-2 font-medium">Phone:</span>{" "}
                        {form.phone}
                      </span>
                    </div>
                    <h5 className="text-xl font-semibold">User Response</h5>
                    <div>

                      {form.answers.map((answer: any) => (
                        <div key={answer._id} className="rounded-xl first:!mt-0 last:!mb-0 my-2">
                          <h2>
                            <button
                              type="button"
                              className="flex justify-between items-center w-full  py-2 text-left text-black focus:outline-none font-medium"
                              onClick={() => toggleAccordion(answer._id)}
                            >
                              <span>{answer.questionLabel}</span>
                              <Image src={ArrowDown} alt="ArrowDown" className={`w-3 h-3 transition-transform ${openAccordion === answer._id ? "rotate-180" : ""
                                }`} />
                            </button>
                          </h2>
                          <div
                            className={` transition-all ${openAccordion === answer._id ? "h-auto p-3  border-t border-gray-200" : "h-0 overflow-hidden"
                              }`}
                          >
                            <p className="text-black">{answer.answer}</p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        ) : (
          <div className="flex flex-col mb-4 justify-center items-center min-h-52 bg-white rounded-xl gap-3 shadow-[0px_0px_60px_30px_#00000008]">
            <Logo />
            <h2 className="text-2xl">Oops! No Response Found</h2>
          </div>
        )}
        {pageCount > 1 && (
          <div className="flex justify-center my-4">
            <Pagination
              pageCount={pageCount}
              onPageChange={handlePageClick}
              currentPage={currentPage}
            />
          </div>
        )}
      </div>
    </div>

  );
};

export default FormSubmissionCard;
