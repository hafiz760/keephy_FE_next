"use client";
import React, { useState } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { Formik, Form } from "formik";
import { signupErrorSchema } from "@/shared/Validations";
import InputField from "@/shared/InputField";
import NameIcon from "@/assets/icons/NameIcon";
import EmailIcon from "@/assets/icons/EmailIcon";
import EyeIcon from "@/assets/icons/openEye.svg";
import CloseEye from "@/assets/icons/closeEye.svg";
import GoogleIcon from "@/assets/icons/GoogleIcon";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch } from "@/Redux/store/store";
import { signUpUser } from "@/Redux/slices/userSlice";
import { GoogleLogin } from "@/components/GoogleLogin/GoogleLogin";
import LoaderIcon from "@/assets/icons/LoaderIcon";

// valid values
const validValues = {
  name: "",
  email: "",
  password: "",
  cPassword: "",
};

const SignupForm = () => {
  const router = useRouter();
  const dispatch: AppDispatch = useDispatch();
  const isLoading = useSelector((state: any) => state?.user?.isLoading);
  const [eye, setEye] = useState(false);
  const [eye1, setEye1] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);
  const submitHandler = (values: typeof validValues) => {
    const { name, email, password, cPassword } = values;
    dispatch(signUpUser({ name, email, password, cPassword, router }));
  };
  return (
    <div className="container gradient-bg ">
      <div className="md:max-w-[600px] mx-auto flex flex-col gap-11">
        <Formik
          initialValues={validValues}
          validationSchema={signupErrorSchema}
          onSubmit={submitHandler}
        >
          {() => (
            <Form>
              <div className="grid sm:grid-cols-2 grid-cols-1 gap-x-5 gap-y-2.5 mb-2.5">
                <InputField
                  righticon={<NameIcon />}
                  placeholder={"Your Name"}
                  name="name"
                  type="text"
                />
                <InputField
                  righticon={<EmailIcon />}
                  placeholder={"Your Email"}
                  name="email"
                  type="email"
                />
                <InputField
                  righticon={
                    <Image
                      className="field-righticon"
                      src={eye ? CloseEye : EyeIcon}
                      loading="lazy"
                      width={20}
                      height={20}
                      onClick={() => {
                        setEye(!eye);
                      }}
                      alt="passwordIcon"
                    />
                  }
                  placeholder={"Password"}
                  name="password"
                  type={eye ? "text" : "password"}
                />
                <InputField
                  righticon={
                    <Image
                      className="field-righticon"
                      src={eye1 ? CloseEye : EyeIcon}
                      loading="lazy"
                      width={20}
                      height={20}
                      onClick={() => {
                        setEye1(!eye1);
                      }}
                      alt="passwordIcon"
                    />
                  }
                  placeholder={"Confirm Password"}
                  name="cPassword"
                  type={eye1 ? "text" : "password"}
                />
              </div>
              <label className="form-checkbox block relative pl-6 cursor-pointer select-none text-black font-normal w-max">
                <input
                  onChange={(e) => setRememberMe(e.target.checked)}
                  type="checkbox"
                  id="generalInquir43"
                  name="generalInquiry"
                  className="absolute opacity-0 cursor-pointer"
                />
                <span className="text-sm text-[#8D8D8D] font-normal">
                  Remember me
                </span>
                <span className="checkmark absolute top-1/2 left-0 h-4 w-4 rounded-[4px] border border-[#8D8D8D] -translate-y-1/2"></span>
              </label>
              <div className="flex items-center justify-center mt-7">
                <button
                  type="submit"
                  className=" bg-black text-white h-14 max-w-80 w-full rounded-full"
                  disabled={isLoading}
                >
                  {isLoading ? <LoaderIcon /> : "Continue"}
                </button>
              </div>
            </Form>
          )}
        </Formik>

        <div className="relative border-t border-[#C6C6C6] w-full">
          <span className="sm:bg-[#e3e7ed] bg-[#d8e5ea] px-2.5 rounded-full text-sm font-medium text-[#C6C6C6] absolute left-1/2 -top-1/2 -translate-y-1/2 -translate-x-1/2">
            OR
          </span>
        </div>
        <div className="flex items-center flex-col justify-center gap-4">
          <GoogleLogin />
          <p className="text-base font-normal text-[#8D8D8D]">
            Already have an account?{" "}
            <span
              onClick={() => router.push("/login")}
              className="text-[#1191D9] font-medium cursor-pointer"
            >
              Login Here
            </span>
          </p>
        </div>
      </div>
    </div>
  );
};

export default SignupForm;
