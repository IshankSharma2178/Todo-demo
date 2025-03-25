"use client";
import React from "react";
import { useCurrent } from "@/features/auth/api/use-current";
import { redirect } from "next/navigation";
import TodoList from "@/features/todos/components/TodoList";

const Page = () => {
  const user = useCurrent();
  if (!user) {
    redirect("/sign-in");
  }
  return (
    <main className="min-h-screen bg-gradient-to-b from-background to-secondary/50">
      <div className="container max-w-4xl mx-auto pt-28 pb-16 px-4">
        <div className="mb-8">
          <h1 className="text-3xl font-bold">My Tasks</h1>
          <p className="text-foreground/70 mt-1">
            Manage your tasks and stay organized
          </p>
        </div>
        <TodoList />
      </div>
    </main>
  );
};

export default Page;
