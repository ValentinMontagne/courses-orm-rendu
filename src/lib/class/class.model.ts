import { classes } from "../../infrastructure/db/schema";
import { z } from "zod";

export const ClassSchema = z.object({
  id: z.string(),
  name: z.string(),
  power: z.number(),
  hp: z.number(),
});
export type Class = typeof classes.$inferSelect;

export const CreateClassSchema = ClassSchema.omit({ id: true });
export type CreateClass = z.infer<typeof CreateClassSchema>;
