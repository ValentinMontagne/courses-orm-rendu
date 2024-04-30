import { z } from "zod";
import { classes } from "../../infrastructure/db/schema";

export const classScheman = z.object({
  id: z.string(),
  name: z.string().min(2),
  power: z.string(),
  hp: z.number(),
});

export type Class = typeof classes.$inferSelect;

export const createClassSchema = classScheman.omit({ id: true });
export type CreateClass = z.infer<typeof createClassSchema>;