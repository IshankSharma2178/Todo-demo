import { z } from "zod";

export const createTaskSchema = z.object({
  title: z.string().trim().min(1),
  description: z.string().trim().min(1),
});
