import type { Metadata } from "next";
import { Poppins } from "next/font/google";
import "./globals.css";
import Layout from "../layout";
import ReduxProvider from "@/Redux/ReduxProvider";
import { Slide, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { Suspense } from "react";
import Loader from "./loader";

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
});

export const metadata: Metadata = {
  title: "Keephy",
  description: "NFC Feedback Solutions",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning={true}>
      <body className={poppins.className}>
        <ReduxProvider>
          <Suspense fallback={<Loader />}>
            <Layout>{children}</Layout>
          </Suspense>
          <ToastContainer
            theme="dark"
            position="top-center"
            hideProgressBar
            autoClose={2000}
            transition={Slide}
          />
        </ReduxProvider>
      </body>
    </html>
  );
}
