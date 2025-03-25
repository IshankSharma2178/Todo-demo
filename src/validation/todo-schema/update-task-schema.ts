import { z } from "zod";

export const updateTaskSchema = z.object({
  title: z.string().trim().min(1),
  description: z.string().trim().min(1),
  completed: z.boolean(),
});
