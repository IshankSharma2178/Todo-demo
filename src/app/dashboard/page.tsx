import React from "react";
import { redirect } from "next/navigation";
import TodoList from "@/features/todos/components/TodoList";
import { getUser } from "@/features/auth/api/use-getUser";

const Page = async () => {
  const user = await getUser();

  if (!user) redirect("/sign-in");

  return (
    <main className="min-h-screen  max-w-11/12 md:w-[960px] mx-auto ">
      <div className="container mt-14">
        <div className="mb-8">
          <h1 className="text-3xl font-bold">My Tasks</h1>
          <p className="text-foreground/70 mt-1">
            Manage your tasks and stay organized
          </p>
        </div>
      </div>
      <TodoList />
    </main>
  );
};

export default Page;
