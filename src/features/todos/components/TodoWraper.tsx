import { useState } from "react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Check, Trash, Edit } from "lucide-react";
import { Textarea } from "@/components/ui/textarea";
import { Input } from "@/components/ui/input";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@radix-ui/react-tooltip";

interface TodoProps {
  title: string;
  description: string;
  completed: boolean;
  userId: string;
  taskId: string;
}

interface TodoItemProps {
  todo: TodoProps;
  onToggleComplete: (taskId: string, completed: boolean) => void;
  onDeleteTask: (taskId: string) => void;
  onEditTask?: (taskId: string, description: string, title: string) => void;
}

const TodoWrapper = ({
  todo,
  onToggleComplete,
  onDeleteTask,
  onEditTask,
}: TodoItemProps) => {
  const [isEditing, setIsEditing] = useState(false);
  const [editedTitle, setEditedTitle] = useState(todo.title);
  const [editedDescription, setEditedDescription] = useState(
    todo.description || ""
  );

  const handleToggleComplete = () => {
    onToggleComplete(todo.taskId, todo.completed);
  };

  const handleDeleteTask = () => {
    onDeleteTask(todo.taskId);
  };

  const handleEditTask = () => {
    if (onEditTask) {
      onEditTask(todo.taskId, editedDescription, editedTitle);
    }
    setIsEditing(false);
  };
  return (
    <div
      className={cn(
        "group p-4 rounded-xl transition-all duration-300 animate-scale-in",
        todo.completed ? "bg-background" : "bg-[#D1E9F6] hover:bg-[#96C9F4]"
      )}
    >
      {isEditing ? (
        <div className="space-y-3">
          <Input
            value={editedTitle}
            onChange={(e) => setEditedTitle(e.target.value)}
            placeholder="Task title"
            className="bg-white/50"
          />
          <Textarea
            value={editedDescription}
            onChange={(e) => setEditedDescription(e.target.value)}
            placeholder="Add description (optional)"
            className="bg-white/50 min-h-[80px]"
          />
          <div className="flex justify-end space-x-2 pt-2">
            <Button
              variant="outline"
              size="sm"
              className="cursor-pointer"
              onClick={() => setIsEditing(false)}
            >
              Cancel
            </Button>
            <Button
              variant="outline"
              className="cursor-pointer"
              size="sm"
              onClick={handleEditTask}
            >
              Edit
            </Button>
          </div>
        </div>
      ) : (
        <div className="flex items-start gap-3">
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger>
                <div
                  onClick={handleToggleComplete}
                  className="  flex-shrink-0 cursor-pointer mt-0.5"
                >
                  <div
                    className={cn(
                      "h-5 w-5 rounded-full border-2 flex items-center justify-center transition-colors",
                      todo.completed
                        ? "border-primary/80 hover:bg-red-300"
                        : "border-foreground/30 hover:bg-green-300 group-hover:border-foreground/50"
                    )}
                  >
                    {todo.completed && (
                      <Check className={"h-3 w-3 text-primary"} />
                    )}
                  </div>
                </div>
              </TooltipTrigger>
              <TooltipContent className=" text-sm bg-[#EEEEEE] rounded-sm px-4 py-1 shadow-lg md:mb-2 ">
                {todo.completed ? "Mark as Incomplete" : "Mark as Complete"}
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>

          <div className="flex-1 min-w-0">
            <h3
              className={cn(
                "text-base font-medium break-words",
                todo.completed && "text-foreground/50 line-through"
              )}
            >
              {todo.title}
            </h3>
            {todo.description && (
              <p
                className={cn(
                  "mt-1 text-sm break-words",
                  todo.completed ? "text-foreground/40" : "text-foreground/60"
                )}
              >
                {todo.description}
              </p>
            )}
          </div>
          <div className="flex gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
            {!todo.completed && (
              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger>
                    <Button
                      variant="ghost"
                      size="icon"
                      className="h-8 w-8 cursor-pointer text-foreground/50 hover:text-foreground"
                      onClick={() => setIsEditing(true)}
                    >
                      <Edit className="h-4 w-4" />
                    </Button>
                  </TooltipTrigger>
                  <TooltipContent>
                    <p className="text-sm bg-[#EEEEEE] rounded-sm px-4 py-1 shadow-lg md:mb-2 ">
                      Edit
                    </p>
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>
            )}

            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger>
                  <Button
                    variant="ghost"
                    size="icon"
                    className="h-8 w-8 text-foreground/50 cursor-pointer hover:text-destructive"
                    onClick={handleDeleteTask}
                  >
                    <Trash className="h-4 w-4" />
                  </Button>
                </TooltipTrigger>
                <TooltipContent>
                  <p className="text-sm bg-[#EEEEEE] rounded-sm px-4 py-1 shadow-lg md:mb-2 ">
                    Delete
                  </p>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
          </div>
        </div>
      )}
    </div>
  );
};

export default TodoWrapper;
