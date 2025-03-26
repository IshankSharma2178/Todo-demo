import { z } from "zod";

export const updateTaskSchema = z.object({
  title: z.string().trim().min(1),
  description: z.string().optional().or(z.literal("")),
  completed: z.boolean(),
});
