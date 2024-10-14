"use client";
import BackIcon from "@/assets/icons/backIcon";
import FormIcon from "@/assets/icons/FormIcon";
import FormSubmissionCard from "@/components/FormCard/FormSubmissionCard";
import withAuthValidation from "@/hoc/withAuth";
import AuthHeadings from "@/shared/AuthHeadings";
import { useRouter } from "next/navigation";
import React from "react";
import { useSelector } from "react-redux";

const FormSubmissions = () => {
  const router = useRouter();
  const formData = useSelector(
    (state: any) => state?.reviewForm?.singleform?.data
  );
  return (
    <main className="container h-full gradient-bg">
      <button
        className="text-[#1191D9] font-semibold text-base cursor-pointer mb-4 flex items-center gap-1"
        onClick={() => router.back()}
      >
        <BackIcon /> Go Back
      </button>
      <div className="flex flex-col gap-4">
        <div className="flex items-center gap-3  sm:flex-nowrap flex-wrap">
          <div className="bg-[#26A8F1] h-14 w-14 rounded-full flex items-center justify-center">
            <FormIcon />
          </div>
          <AuthHeadings
            heading={formData?.name}
            description={
              "Here are all the form submissions. Review the responses."
            }
            business
          />
        </div>
      </div>
      <FormSubmissionCard />
    </main>
  );
};

export default withAuthValidation(FormSubmissions);
