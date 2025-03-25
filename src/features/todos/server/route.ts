import { Hono } from "hono";
import { sessionMiddleware } from "@/features/middleware/session.middleware";
import { DATABASE_ID, TASK_ID } from "@/config";
import { ID, Query } from "node-appwrite";
import { zValidator } from "@/features/middleware/validation.middleware";
import { updateTaskSchema } from "@/validation/todo-schema/update-task-schema";
import { createTaskSchema } from "@/validation/todo-schema/create-task-schema";
import { deleteTaskSchema } from "@/validation/todo-schema/delete-task-schema";

const app = new Hono()
  .get("/tasks", sessionMiddleware, async (c) => {
    const user = c.get("user");
    const databases = c.get("databases");

    const tasks = await databases.listDocuments(DATABASE_ID, TASK_ID, [
      Query.equal("userId", user.$id),
    ]);

    if (!tasks) {
      return c.json({ error: "Tasks not found" }, 404);
    }
    return c.json({ data: { tasks: tasks } });
  })

  .post(
    "/tasks",
    sessionMiddleware,
    zValidator("json", createTaskSchema),
    async (c) => {
      const user = c.get("user");
      const databases = c.get("databases");
      const { title, description } = c.req.valid("json");
      const createTask = await databases.createDocument(
        DATABASE_ID,
        TASK_ID,
        ID.unique(),
        {
          taskId: ID.unique(),
          userId: user.$id,
          title: title,
          description: description,
          completed: false,
        }
      );

      if (!createTask) {
        return c.json({ error: "Failed to create task" }, 500);
      }
      return c.json({ data: { task: createTask } });
    }
  )
  .put(
    "/tasks/:id",
    sessionMiddleware,
    zValidator("form", updateTaskSchema),
    async (c) => {
      const user = c.get("user");
      const databases = c.get("databases");
      const { id } = c.req.param();
      const { title, description, completed } = c.req.valid("form");
      const updateTask = await databases.updateDocument(
        DATABASE_ID,
        TASK_ID,
        id,
        { title, description, completed }
      );
      if (!updateTask) {
        return c.json({ error: "Failed to update task" }, 500);
      }
      return c.json({ data: { task: updateTask } });
    }
  )
  .delete(
    "/tasks/:id",
    sessionMiddleware,
    zValidator("form", deleteTaskSchema),
    async (c) => {
      const user = c.get("user");
      const databases = c.get("databases");
      const deleteTask = await databases.deleteDocument(
        DATABASE_ID,
        TASK_ID,
        c.req.param("id")
      );
    }
  );

export default app;
