import { z } from "zod";
import { classes } from "../../infrastructure/db/schema";

export const ClasseSchema = z.object({
  id: z.string(),
  name: z.string().min(2),
});
export type Classe = typeof classes.$inferSelect;

export const CreateClasseSchema = ClasseSchema.omit({ id: true });
export type CreateClasses = z.infer<typeof CreateClasseSchema>;