"use client"
import React, { ReactNode, useState } from "react";
import Header from "../components/Layout/Header";
import Footer from "../components/Layout/Footer";
import MobileNav from "@/components/Layout/MobileNav";

interface LayoutProps {
  children: ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  const [toggled, setToggled] = useState<boolean>(false);

  return (
    <>

      <div className="flex flex-col justify-between h-screen">
        <MobileNav toggled={toggled} setToggled={setToggled} />
        <div>
          <Header toggled={toggled} setToggled={setToggled} />
          {children}
        </div>
        <Footer />
      </div>
    </>
  );
};

export default Layout;
