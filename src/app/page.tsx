import Link from "next/link";
import { Button } from "@/components/ui/button";
import { CheckCircle } from "lucide-react";
import Navbar from "@/components/navbar";
import { redirect } from "next/navigation";
import { getUser } from "@/features/auth/api/use-getUser";

const Page = async () => {
  const user = await getUser();

  if (user) {
    redirect("/dashboard");
  }

  return (
    <div className="max-w-11/12 lg:w-[1260px] mx-auto ">
      <Navbar />
      <section className="min-h-screen md:pt-24  pb-16 flex flex-col justify-center section-padding">
        <div className="container max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">
          <div className={`space-y-6 `}>
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
          <div className={`h-full flex justify-center `}></div>
        </div>
      </section>
    </div>
  );
};

export default Page;
