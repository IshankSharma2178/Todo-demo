import { z } from "zod";

export const deleteTaskSchema = z.object({
  taskId: z.string().min(1),
});
