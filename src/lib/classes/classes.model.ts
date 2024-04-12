import {classes} from "../../infrastructure/db/schema";
import { z } from "zod";


export const ClasseSchema = z.object({
    id: z.string(),
    name: z.string().min(2),
    power: z.number().positive(),
    hp: z.number().positive()
});
export type Classe = typeof classes.$inferSelect;

export const CreateClasseSchema = ClasseSchema.omit({ id: true });
export const UpdateClasseSchema = ClasseSchema.omit({ id: true });
export type CreateClasse = z.infer<typeof CreateClasseSchema>;
export type UpdateClasse = z.infer<typeof UpdateClasseSchema>;

