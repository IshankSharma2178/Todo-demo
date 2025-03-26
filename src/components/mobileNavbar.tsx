import Link from "next/link";
import React, { useState } from "react";
import { Button } from "./ui/button";
import { Menu, X } from "lucide-react";
import { usePathname } from "next/navigation";
import { useLogout } from "@/features/auth/api/use-logout";

export const MobileNavbar = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { mutate: logout } = useLogout();
  const pathname = usePathname();

  return (
    <>
      <button
        className="md:hidden p-2 rounded-md text-foreground/80 hover:text-foreground hover:bg-foreground/5 transition-colors"
        onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
        aria-label="Toggle menu"
      >
        {mobileMenuOpen ? (
          <X className="w-6 h-6" />
        ) : (
          <Menu className="w-6 h-6" />
        )}
      </button>
      {mobileMenuOpen && (
        <div className="md:hidden absolute top-14 left-0 w-full bg-background/80 backdrop-blur-md shadow-md py-6 px-6 rounded-md animate-fade-in">
          <nav className="flex flex-col space-y-4">
            {pathname === "/dashboard" ? (
              <>
                <div className="px-4 py-2 rounded-md font-medium text-primary">
                  Dashboard
                </div>
                <Button onClick={() => logout()} className="mt-2 w-full">
                  Sign Out
                </Button>
              </>
            ) : (
              <div className="flex flex-col space-y-2">
                <Link href="/sign-in">
                  <Button variant="outline" className="w-full">
                    Sign In
                  </Button>
                </Link>
                <Link href="/sign-up">
                  <Button className="w-full">Sign Up</Button>
                </Link>
              </div>
            )}
          </nav>
        </div>
      )}
    </>
  );
};
