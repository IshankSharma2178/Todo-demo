import React from "react";
import { useGetAllTodos } from "../api/use-getAllTodos";
import { Loader } from "lucide-react";
import TodoItem from "./TodoItem";

const TodoPreview = () => {
  const { data: todos, isLoading } = useGetAllTodos();

  if (isLoading) {
    return (
      <div className="flex justify-center my-auto items-center h-full">
        <Loader />
      </div>
    );
  }

  return (
    <div>
      {!todos ? (
        <div className="text-center py-12">
          <p className="text-foreground/60">
            No tasks yet. Add your first task to get started!
          </p>
        </div>
      ) : (
        <TodoItem Todos={todos?.data ?? []} />
      )}
    </div>
  );
};

export default TodoPreview;
