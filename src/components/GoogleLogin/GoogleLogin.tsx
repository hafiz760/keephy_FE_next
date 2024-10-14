"use client";

import GoogleIcon from "@/assets/icons/GoogleIcon";
import { googleLogin } from "@/Redux/slices/userSlice";
import { AppDispatch } from "@/Redux/store/store";
import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import dynamic from "next/dynamic";

interface LoginSocialGoogleProps {
  children: React.ReactNode;
  className?: string;
  isOnlyGetToken?: boolean;
  client_id: string;
  scope?: string;
  discoveryDocs?: string;
  access_type?: string;
  onResolve: ({ provider, data }: { provider: any; data: any }) => void;
  onReject: (error: any) => void;
}
const LoginSocialGoogle = dynamic<LoginSocialGoogleProps>(
  () => import("reactjs-social-login").then((mod) => mod.LoginSocialGoogle),
  { ssr: false }
);

export const GoogleLogin = () => {
  const [isClient, setIsClient] = useState(false);
  const dispatch: AppDispatch = useDispatch();

  useEffect(() => {
    setIsClient(true);
  }, []);

  const handleGoogleLogin = (data: any) => {
    const { code } = data;
    dispatch(googleLogin({ code }));
  };
  if (!isClient) return null;

  return (
    <LoginSocialGoogle
      className="max-w-80 w-full"
      isOnlyGetToken
      client_id={process.env.NEXT_PUBLIC_GOOGLE_CLIENT as string}
      scope="openid profile email"
      discoveryDocs="claims_supported"
      access_type="offline"
      onResolve={({ provider, data }: { provider: any; data: any }) => {
        handleGoogleLogin(data);
      }}
      onReject={(error: any) => {
        console.error(error);
      }}
    >
      <button className="text-black w-full h-14 rounded-xl border border-[#C6C6C6] text-base font-semibold flex gap-3 items-center justify-center">
        <GoogleIcon />
        Sign Up with Google
      </button>
    </LoginSocialGoogle>
  );
};
