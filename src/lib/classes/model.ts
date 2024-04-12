import { classes } from "../../infrastructure/db/schema";
import { z } from "zod";

export const ClasseSchema = z.object({
  id: z.number(),
  name: z.string(),
  power: z.number(),
  hp: z.number(),
});
export type Classe = typeof classes.$inferSelect;

export const CreateClasseSchema = ClasseSchema.omit({ id: true });
export type CreateClasse = z.infer<typeof CreateClasseSchema>;