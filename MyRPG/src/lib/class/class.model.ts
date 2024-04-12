import { classes } from "../../infrastructure/db/schema";
import { z } from "zod";

export const ClassSchema = z.object({
  id: z.string().optional(),
  name: z.string(),
  power: z.number().nonnegative(),
  hp: z.number().nonnegative(),
});
export type Class = typeof classes.$inferSelect;

export const CreateClassSchema = ClassSchema.omit({ id: true });
export type CreateClass = z.infer<typeof CreateClassSchema>;
