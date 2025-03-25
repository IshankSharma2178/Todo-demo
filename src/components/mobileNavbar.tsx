import Link from "next/link";
import React, { useState } from "react";
import { Button } from "./ui/button";
import { Menu, X } from "lucide-react";

export const MobileNavbar = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const isAuthenticated = false;

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
        <div className="md:hidden glass mt-1 py-4 px-6 animate-fade-in">
          <nav className="flex flex-col space-y-3">
            <Link
              href="/"
              className={`px-4 py-2 rounded-md transition-colors ${
                location.pathname === "/"
                  ? "text-primary font-medium"
                  : "text-foreground/70 hover:text-foreground"
              }`}
            >
              Home
            </Link>
            {isAuthenticated ? (
              <>
                <Link
                  href="/dashboard"
                  className={`px-4 py-2 rounded-md transition-colors ${
                    location.pathname === "/dashboard"
                      ? "text-primary font-medium"
                      : "text-foreground/70 hover:text-foreground"
                  }`}
                >
                  Dashboard
                </Link>
                <Button
                  onClick={() => console.log("Sign out")}
                  className="mt-2"
                >
                  Sign Out
                </Button>
              </>
            ) : (
              <div className="flex flex-col space-y-2 pt-2">
                <Link href="/sign-in" className="w-full">
                  <Button variant="outline" className="w-full">
                    Sign In
                  </Button>
                </Link>
                <Link href="/sign-up" className="w-full">
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
