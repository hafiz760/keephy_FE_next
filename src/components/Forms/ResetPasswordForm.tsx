"use client";
import React from "react";
import { useRouter } from "next/navigation";
import { Formik, Form } from "formik";
import { resetPasswordErrorSchema } from "@/shared/Validations";
import InputField from "@/shared/InputField";
import EmailIcon from "@/assets/icons/EmailIcon";
import { AppDispatch } from "@/Redux/store/store";
import { useDispatch, useSelector } from "react-redux";
import { forgotPassword } from "@/Redux/slices/userSlice";
import LoaderIcon from "@/assets/icons/LoaderIcon";

// valid values
const validValues = {
  email: "",
};

const ResetPasswordForm = () => {
  const router = useRouter();
  const dispatch: AppDispatch = useDispatch();
  const isLoading = useSelector((state: any) => state?.user?.isLoading);

  // form submit handler
  const submitHandler = (values: typeof validValues) => {
    const { email } = values;
    dispatch(forgotPassword({ email, router }));
  };
  return (
    <div className="container gradient-bg">
      <div className="mx-auto flex flex-col items-center gap-11 max-w-96 w-full">
        <Formik
          initialValues={validValues}
          validationSchema={resetPasswordErrorSchema}
          onSubmit={submitHandler}
        >
          {() => (
            <Form className="w-full">
              <InputField
                righticon={<EmailIcon />}
                placeholder={"Enter your email"}
                name="email"
                type="email"
              />
              <div className="flex flex-col items-center justify-center gap-6 mt-7">
                <button
                  type="submit"
                  className=" bg-black text-white h-14 w-full rounded-full"
                  disabled={isLoading}
                >
                  {isLoading ? <LoaderIcon /> : "Continue"}
                </button>
                <span
                  className="text-[#1191D9] font-semibold text-sm cursor-pointer"
                  onClick={() => router.back()}
                >
                  Go Back
                </span>
              </div>
            </Form>
          )}
        </Formik>
      </div>
    </div>
  );
};

export default ResetPasswordForm;
