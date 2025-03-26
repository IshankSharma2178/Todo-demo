import { Hono } from "hono";
import { sessionMiddleware } from "@/features/middleware/session.middleware";
import { DATABASE_ID, TASK_ID } from "@/config";
import { ID, Query } from "node-appwrite";
import { zValidator } from "@/features/middleware/validation.middleware";
import { updateTaskSchema } from "@/validation/todo-schema/update-task-schema";
import { createTaskSchema } from "@/validation/todo-schema/create-task-schema";
import { getDocument } from "@/features/utils/getDocument";

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
    zValidator("json", updateTaskSchema.partial()),
    async (c) => {
      const user = c.get("user");
      const databases = c.get("databases");
      const { id } = c.req.param();
      const updateFields = c.req.valid("json");

      if (Object.keys(updateFields).length === 0) {
        return c.json({ error: "No fields provided for update" }, 400);
      }

      try {
        const taskQuery = await getDocument({ databases, taskId: id });

        if (!taskQuery) {
          return c.json({ error: "Task not found" }, 404);
        }

        const documentId = taskQuery.documents[0].$id;
        const updateTask = await databases.updateDocument(
          DATABASE_ID,
          TASK_ID,
          documentId,
          updateFields
        );

        return c.json({ data: { task: updateTask } });
      } catch {
        return c.json({ error: "Failed to update task" }, 500);
      }
    }
  )

  .delete("/tasks/:id", sessionMiddleware, async (c) => {
    const databases = c.get("databases");
    const taskId = c.req.param("id");

    const taskQuery = await getDocument({ databases, taskId });

    if (!taskQuery) {
      return c.json({ error: "Task not found" }, 404);
    }

    const documentId = taskQuery.documents[0].$id;

    const deleteTask = await databases.deleteDocument(
      DATABASE_ID,
      TASK_ID,
      documentId
    );

    return c.json({ data: { task: deleteTask } });
  });

export default app;
