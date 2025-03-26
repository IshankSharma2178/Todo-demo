import React from "react";
import TodoWrapper from "./TodoWraper";
import { useUpdateTask } from "../api/use-updateTodo";
import { useDeleteTask } from "../api/use-deleteTodo";

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

  const { mutate: mutateUpdateTask, isPending: isLoadinfUpdateTask } =
    useUpdateTask();
  const { mutate: mutateDeleteTask, isPending: isLoadingDeleteTask } =
    useDeleteTask();

  const handleToggleComplete = (taskId: string, completed: boolean) => {
    mutateUpdateTask({
      json: { completed: !completed },
      param: { id: taskId },
    });
  };

  const handleEditTask = (
    taskId: string,
    description: string,
    title: string
  ) => {
    mutateUpdateTask({
      json: { title, description },
      param: { id: taskId },
    });
  };

  const handleDeleteTask = (taskId: string) => {
    mutateDeleteTask({ param: { id: taskId } });
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
                onToggleComplete={handleToggleComplete}
                onDeleteTask={handleDeleteTask}
                onEditTask={handleEditTask}
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
                onToggleComplete={handleToggleComplete}
              />
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default TodoItem;
