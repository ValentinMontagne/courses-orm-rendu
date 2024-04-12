import {z} from "zod";
import {classes} from "../../infrastructure/db/schema";

export const ClassSchema = z.object({
    id: z.string(),
    name: z.string().min(2),
    power: z.number().int(),
    hp: z.number().int(),
});
export type Class = typeof classes.$inferSelect;

export const CreateClassSchema = ClassSchema.omit({ id: true });
export type CreateClass = z.infer<typeof CreateClassSchema>;