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
      Query.orderAsc("$createdAt"),
    ]);

    if (!tasks || !tasks.documents.length) {
      return c.json({ error: "Tasks not found" }, 404);
    }
    const filteredTasks = tasks.documents.map((task) => ({
      userId: task.userId,
      taskId: task.taskId,
      title: task.title,
      description: task.description,
      completed: task.completed,
    }));

    console.log(filteredTasks);

    return c.json({ data: filteredTasks });
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
    zValidator("form", updateTaskSchema.partial()),
    async (c) => {
      const user = c.get("user");
      const databases = c.get("databases");
      const { id } = c.req.param();
      const updateFields = c.req.valid("form");

      if (Object.keys(updateFields).length === 0) {
        return c.json({ error: "No fields provided for update" }, 400);
      }

      const updateTask = await databases.updateDocument(
        DATABASE_ID,
        TASK_ID,
        id,
        updateFields
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
    async (c) => {
      const databases = c.get("databases");
      const deleteTask = await databases.deleteDocument(
        DATABASE_ID,
        TASK_ID,
        c.req.param("id")
      );
    }
  );

export default app;
