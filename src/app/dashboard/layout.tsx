import Navbar from "@/components/navbar";
import React from "react";

const layout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className=" min-h-screen">
      <div className=" mx-auto max-w-screen-2xl p-4 ">
        <nav className="  flex justify-between items-center">
          <Navbar />
        </nav>
        <div className="flex flex-col items-center justify-center pt-4 md:pt-14">
          {children}
        </div>
      </div>
    </div>
  );
};

export default layout;
