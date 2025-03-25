import { useState } from "react";
import { cn } from "@/lib/utils";
import { Todo } from "@/lib/types";
import { Button } from "@/components/ui/button";
import { Check, Circle, Trash, Edit } from "lucide-react";
import { Textarea } from "@/components/ui/textarea";
import { Input } from "@/components/ui/input";

interface TodoItemProps {
  todo: Todo;
  onToggleComplete: (id: string) => void;
  onEdit: (id: string, title: string, description?: string) => void;
  onDelete: (id: string) => void;
}

const TodoItem = ({
  todo,
  onToggleComplete,
  onEdit,
  onDelete,
}: TodoItemProps) => {
  const [isEditing, setIsEditing] = useState(false);
  const [editedTitle, setEditedTitle] = useState(todo.title);
  const [editedDescription, setEditedDescription] = useState(
    todo.description || ""
  );

  const handleToggleComplete = () => {
    onToggleComplete(todo.id);
  };

  const handleEdit = () => {
    if (isEditing) {
      onEdit(todo.id, editedTitle, editedDescription);
    }
    setIsEditing(!isEditing);
  };

  const handleDelete = () => {
    onDelete(todo.id);
  };

  return (
    <div
      className={cn(
        "group p-4 rounded-xl transition-all duration-300 animate-scale-in",
        todo.completed ? "bg-background" : "bg-primary/5 hover:bg-primary/10"
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
              onClick={() => setIsEditing(false)}
            >
              Cancel
            </Button>
            <Button
              size="sm"
              onClick={handleEdit}
              disabled={!editedTitle.trim()}
            >
              Save
            </Button>
          </div>
        </div>
      ) : (
        <div className="flex items-start gap-3">
          <button
            onClick={handleToggleComplete}
            className="flex-shrink-0 mt-0.5"
          >
            <div
              className={cn(
                "h-5 w-5 rounded-full border-2 flex items-center justify-center transition-colors",
                todo.completed
                  ? "border-primary/80"
                  : "border-foreground/30 group-hover:border-foreground/50"
              )}
            >
              {todo.completed && <Check className="h-3 w-3 text-primary" />}
            </div>
          </button>

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
            <Button
              variant="ghost"
              size="icon"
              className="h-8 w-8 text-foreground/50 hover:text-foreground"
              onClick={handleEdit}
            >
              <Edit className="h-4 w-4" />
            </Button>
            <Button
              variant="ghost"
              size="icon"
              className="h-8 w-8 text-foreground/50 hover:text-destructive"
              onClick={handleDelete}
            >
              <Trash className="h-4 w-4" />
            </Button>
          </div>
        </div>
      )}
    </div>
  );
};

export default TodoItem;
