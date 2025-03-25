"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Check, CheckCircle, Circle } from "lucide-react";
import Navbar from "@/components/navbar";

const Page = () => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsVisible(true);
    }, 100);

    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="max-w-11/12 lg:w-[1260px] mx-auto ">
      <Navbar />
      <section className="min-h-screen md:pt-24  pb-16 flex flex-col justify-center section-padding">
        <div className="container max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">
          <div
            className={`space-y-6 ${
              isVisible ? "animate-fade-up" : "opacity-0"
            }`}
          >
            <div className="inline-block px-3 py-1 rounded-full bg-primary/10 border border-primary/20 text-sm text-primary font-medium">
              Beautifully Simple
            </div>
            <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold tracking-tight text-balance">
              Focus on what <span className="text-gradient">matters</span>
            </h1>
            <p className="text-lg text-foreground/80 max-w-xl leading-relaxed">
              A minimal, beautiful task manager designed to help you focus on
              what truly matters. Distraction-free and intuitive.
            </p>
            <div className="flex flex-wrap gap-4 pt-2">
              <Link href="/sign-up">
                <Button
                  size="lg"
                  className="rounded-xl cursor-pointer h-12 px-6"
                >
                  Get Started
                </Button>
              </Link>
              <Link href="/sign-in">
                <Button
                  size="lg"
                  variant="outline"
                  className="rounded-xl h-12 px-6 cursor-pointer"
                >
                  Sign In
                </Button>
              </Link>
            </div>
            <div className="pt-4 flex flex-col sm:flex-row gap-4 sm:gap-8 text-foreground/70">
              <div className="flex items-center gap-2">
                <CheckCircle className="w-5 h-5 text-primary" />
                <span>Simple & intuitive</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle className="w-5 h-5 text-primary" />
                <span>Distraction-free</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle className="w-5 h-5 text-primary" />
                <span>100% free</span>
              </div>
            </div>
          </div>
          <div
            className={`h-full flex justify-center ${
              isVisible ? "animate-fade-in delay-300" : "opacity-0"
            }`}
          >
            {/* <div className="glass rounded-2xl p-6 w-full max-w-md">
              <div className="space-y-4">
                <div className="flex justify-between items-center mb-6">
                  <h3 className="font-medium text-lg">Today's Tasks</h3>
                  <span className="text-sm text-foreground/60">
                    4 of 6 completed
                  </span>
                </div> */}

            {/* Demo Todo Items */}
            {/* <div className="space-y-3">
                  <div className="flex items-center p-3 rounded-lg bg-background transition-colors">
                    <div className="flex-shrink-0 mr-3">
                      <div className="h-5 w-5 rounded-full border-2 border-primary/80 flex items-center justify-center">
                        <Check className="h-3 w-3 text-primary" />
                      </div>
                    </div>
                    <span className="flex-1 text-foreground/50 line-through">
                      Morning meditation
                    </span>
                  </div>

                  <div className="flex items-center p-3 rounded-lg bg-background transition-colors">
                    <div className="flex-shrink-0 mr-3">
                      <div className="h-5 w-5 rounded-full border-2 border-primary/80 flex items-center justify-center">
                        <Check className="h-3 w-3 text-primary" />
                      </div>
                    </div>
                    <span className="flex-1 text-foreground/50 line-through">
                      Team meeting
                    </span>
                  </div>

                  <div className="flex items-center p-3 rounded-lg bg-primary/5 transition-colors">
                    <div className="flex-shrink-0 mr-3">
                      <div className="h-5 w-5 rounded-full border-2 border-foreground/30 flex items-center justify-center">
                        <Circle className="h-3 w-3 text-transparent" />
                      </div>
                    </div>
                    <span className="flex-1">Write project proposal</span>
                  </div>

                  <div className="flex items-center p-3 rounded-lg bg-background transition-colors">
                    <div className="flex-shrink-0 mr-3">
                      <div className="h-5 w-5 rounded-full border-2 border-primary/80 flex items-center justify-center">
                        <Check className="h-3 w-3 text-primary" />
                      </div>
                    </div>
                    <span className="flex-1 text-foreground/50 line-through">
                      Lunch with Alex
                    </span>
                  </div>

                  <div className="flex items-center p-3 rounded-lg bg-background transition-colors">
                    <div className="flex-shrink-0 mr-3">
                      <div className="h-5 w-5 rounded-full border-2 border-primary/80 flex items-center justify-center">
                        <Check className="h-3 w-3 text-primary" />
                      </div>
                    </div>
                    <span className="flex-1 text-foreground/50 line-through">
                      Review design updates
                    </span>
                  </div>

                  <div className="flex items-center p-3 rounded-lg bg-primary/5 transition-colors">
                    <div className="flex-shrink-0 mr-3">
                      <div className="h-5 w-5 rounded-full border-2 border-foreground/30 flex items-center justify-center">
                        <Circle className="h-3 w-3 text-transparent" />
                      </div>
                    </div>
                    <span className="flex-1">
                      Prepare for tomorrow's presentation
                    </span>
                  </div>
                </div> */}

            {/* <div className="pt-4">
                  <Button
                    variant="outline"
                    className="w-full justify-start text-foreground/60"
                  >
                    <span className="text-primary mr-2">+</span> Add new task
                  </Button>
                </div> */}
            {/* </div> */}
            {/* </div> */}
          </div>
        </div>
      </section>
    </div>
  );
};

export default Page;
