import { classes } from "../../infrastructure/db/schema";
import { z } from "zod";

export const classeSchema = z.object({
  id: z.string(),
  name: z.string().min(2),
  power: z.string(),
  hp: z.string(),
});
export type Classe = typeof classes.$inferSelect;

export const CreateClasseSchema = classeSchema.omit({ id: true });
export type CreateClasse = z.infer<typeof CreateClasseSchema>;
