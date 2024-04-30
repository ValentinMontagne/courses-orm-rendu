import { classes } from "../../infrastructure/db/schema";
import { z } from "zod";

export const ClasseSchema = z.object({
  id: z.coerce.number(),
  name: z.string(),
  power: z.string(),
  hp: z.string(),
});
export type Classe = typeof classes.$inferSelect;

export const CreateClasseSchema = ClasseSchema.omit({ id: true });
export type CreateClasse = z.infer<typeof CreateClasseSchema>;