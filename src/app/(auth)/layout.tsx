"use client";

import { Button } from "@/components/ui/button";
import Link from "next/link";
import { usePathname } from "next/navigation";
import React, { ReactNode } from "react";

const AuthLayout = ({ children }: { children: ReactNode }) => {
  const pathName = usePathname();
  return (
    <div className="bg-neutral-100 min-h-screen">
      <div className="mx-auto max-w-screen-2xl p-4">
        <nav className="flex justify-between items-center">
          <div>Minimal Tasks</div>
          <div className="flex items-center gap-2">
            <Link href="/">
              <Button variant="secondary" className="cursor-pointer">
                Home
              </Button>
            </Link>
            <Button variant={"default"} className="cursor-pointer">
              {pathName === "/sign-up" ? (
                <Link href="/sign-in">Log In</Link>
              ) : (
                <Link href="/sign-up">Sign Up</Link>
              )}
            </Button>
          </div>
        </nav>
        <div className="flex flex-col items-center justify-center pt-4 md:pt-14">
          {children}
        </div>
      </div>
    </div>
  );
};

export default AuthLayout;
