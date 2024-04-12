import { Classes } from "../../infrastructure/db/schema";
import { z } from "zod";

export const ClasseSchema = z.object({
  id: z.string(),
  name: z.string(),
  power: z.number(),
  hp: z.number(),
});
export type Class = typeof Classes.$inferSelect;

export const CreateClassSchema = ClasseSchema.omit({ id: true });
export type CreateClass = z.infer<typeof CreateClassSchema>;
