import { classes } from "../infrastructure/db/schema";
import { z } from "zod";

export const ClassesSchema = z.object({
  id: z.string(),
  name: z.string().min(2),
  hp: z.coerce.number(),
  power : z.string(),
});
export type Classes = typeof classes.$inferSelect;

export const CreateClassesSchema = ClassesSchema.omit({ id: true });
export type CreateClassesSchema = z.infer<typeof CreateClassesSchema>;
