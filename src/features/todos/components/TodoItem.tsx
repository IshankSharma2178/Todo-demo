import React from "react";
import TodoWrapper from "./TodoWraper";
import { useUpdateTask } from "../api/use-updateTodo";

interface TodoProps {
  title: string;
  description: string;
  completed: boolean;
  userId: string;
  taskId: string;
}

const TodoItem = ({ Todos }: { Todos: TodoProps[] }) => {
  const incompleteTodos = Todos.filter((todo) => !todo.completed);
  const completedTodos = Todos.filter((todo) => todo.completed);

  const { mutate, isLoading } = useUpdateTask();

  const handleToggleComplete = (taskId: string, completed: boolean) => {
    mutate({ id: taskId, json: { completed: !completed } });
  };

  const handleEditTodo = (todo: TodoProps) => {
    mutate({ id: taskId, json: { title: } });
  };

  return (
    <div>
      {incompleteTodos.length > 0 && (
        <div className="mb-8">
          <h2 className="text-xl font-medium mb-3">Tasks</h2>
          <div className="space-y-3">
            {incompleteTodos.map((todo) => (
              <TodoWrapper
                key={todo.taskId}
                todo={todo}
                onToggleComplete={() => handleToggleComplete}
                onEdit={() => handleEditTodo(todo)}
                onDelete={() => handleDeleteTodo(todo.taskId)}
              />
            ))}
          </div>
        </div>
      )}

      {completedTodos.length > 0 && (
        <div>
          <h2 className="text-xl font-medium mb-3 text-foreground/70">
            Completed
          </h2>
          <div className="space-y-2 opacity-80">
            {completedTodos.map((todo) => (
              <TodoWrapper
                key={todo.taskId}
                todo={todo}
                onToggleComplete={() => handleToggleComplete(todo.taskId, todo.completed)}
              />
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default TodoItem;
