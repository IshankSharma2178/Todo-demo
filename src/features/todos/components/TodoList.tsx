"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Plus } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { DottedSeparator } from "@/components/dotted-separator";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import { createTaskSchema } from "@/validation/todo-schema/create-task-schema";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useCreateTask } from "../api/use-creaeTodo";
import { Textarea } from "@/components/ui/textarea";
import TodoPreview from "./TodoPreview";
import { z } from "zod";

const TodoList = () => {
  const { mutate, isPending } = useCreateTask();
  const [isAddingTodo, setIsAddingTodo] = useState(false);

  const form = useForm<Zod.infer<typeof createTaskSchema>>({
    resolver: zodResolver(createTaskSchema),
    defaultValues: {
      title: "",
      description: "",
    },
  });

  const onSubmit = (value: z.infer<typeof createTaskSchema>) => {
    mutate(
      { json: value },
      {
        onSuccess: () => {
          form.reset();
          setIsAddingTodo(false);
        },
      }
    );
  };

  return (
    <div className="w-full max-w-3xl mx-auto">
      <div className="mb-6">
        {isAddingTodo ? (
          <Card className=" h-full w-[100%] border-none shadow-none">
            <CardHeader className="flex justify-center items-center text-center p-4">
              <CardTitle className="text-2xl">Add Todo</CardTitle>
            </CardHeader>
            <div className="px-7 ">
              <DottedSeparator />
            </div>
            <CardContent className="p-7">
              <Form {...form}>
                <form
                  onSubmit={form.handleSubmit(onSubmit)}
                  className="space-y-4"
                >
                  <FormField
                    name="title"
                    control={form.control}
                    render={({ field }) => (
                      <FormItem>
                        <FormControl>
                          <Input
                            {...field}
                            type="text"
                            placeholder="Enter Title"
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    name="description"
                    control={form.control}
                    render={({ field }) => (
                      <FormItem>
                        <FormControl>
                          <Textarea
                            {...field}
                            placeholder="Enter Description"
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <div className="flex flex-row gap-4 justify-end">
                    <Button
                      disabled={isPending}
                      onClick={() => setIsAddingTodo(false)}
                      variant="secondary"
                      className=" cursor-pointer"
                    >
                      Cancel
                    </Button>
                    <Button
                      disabled={isPending}
                      variant="outline"
                      className="cursor-pointer"
                    >
                      Add Task
                    </Button>
                  </div>
                </form>
              </Form>
            </CardContent>
          </Card>
        ) : (
          <Button
            onClick={() => setIsAddingTodo(true)}
            className="w-[100%] justify-start text-lg py-6 rounded-xl bg-white/70 hover:bg-white shadow-sm text-gray-400 cursor-text"
          >
            <Plus className="mr-2 h-5 w-5 text-gray-400 " />
            Add new task
          </Button>
        )}
      </div>
      <TodoPreview />
    </div>
  );
};

export default TodoList;
