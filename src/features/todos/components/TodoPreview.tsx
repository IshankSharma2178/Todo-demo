import React from "react";
import { useGetAllTodos } from "../api/use-getAllTodos";
import { Loader } from "lucide-react";
import TodoItem from "./TodoItem";

const TodoPreview = () => {
  const { data: todos, isLoading } = useGetAllTodos();

  if (isLoading) {
    return <Loader />;
  }

  console.log("Fetched Todos:", todos);

  return (
    <div>
      {todos?.data?.length === 0 ? (
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
