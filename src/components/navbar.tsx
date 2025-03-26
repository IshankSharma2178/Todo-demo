"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { MobileNavbar } from "./mobileNavbar";
import { usePathname } from "next/navigation";
import { useLogout } from "@/features/auth/api/use-logout";

const Navbar = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  const [isScrolled, setIsScrolled] = useState(false);

  const { mutate: logout } = useLogout();
  const pathname = usePathname();

  useEffect(() => {
    if (pathname === "/dashboard") {
      setIsAuthenticated(true);
    }
  }, [pathname]);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 bg-neutral-50 transition-all md:px-0 px-4 flex duration-300 ${
        isScrolled ? "py-3 glass shadow-sm" : "py-5 bg-transparent"
      }`}
    >
      <div className="container mx-auto max-w-[1260px] w-11/12 md:flex md:items-center md:justify-between">
        <Link
          href="/"
          className="text-2xl font-medium tracking-tight transition-colors"
        >
          <span className="text-gradient">Minimal</span>
          <span className="ml-1 opacity-90">Tasks</span>
        </Link>

        <nav className="hidden md:flex items-center space-x-1">
          {isAuthenticated ? (
            <>
              <Link
                href="/"
                className={`px-4 py-2 rounded-md transition-colors ${
                  pathname === "/"
                    ? "text-primary font-medium"
                    : "text-foreground/70 hidden hover:text-foreground hover:bg-foreground/5"
                }`}
              >
                Home
              </Link>
              <Link
                href="/dashboard"
                className={`px-4 py-2 rounded-md transition-colors ${
                  pathname === "/dashboard"
                    ? "text-primary font-medium"
                    : "text-foreground/70 hover:text-foreground hover:bg-foreground/5"
                }`}
              >
                Dashboard
              </Link>
              <Button className="cursor-pointer" onClick={() => logout()}>
                Sign Out
              </Button>
            </>
          ) : (
            <>
              <Link href="/sign-in">
                <Button
                  variant="ghost"
                  className="text-foreground/80 hover:text-foreground cursor-pointer"
                >
                  Sign In
                </Button>
              </Link>
              <Link href="/sign-up">
                <Button className="animate-fade-in cursor-pointer">
                  Sign Up
                </Button>
              </Link>
            </>
          )}
        </nav>
      </div>
      <MobileNavbar />
    </header>
  );
};

export default Navbar;
