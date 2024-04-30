import { HttpBadRequest, HttpForbidden } from "@httpx/exception";
import { classes } from "../../infrastructure/db/schema";
import { z } from "zod";

export const ClassSchema = z.object({
    name: z.string().min(2),
    power: z.coerce.number(),
    hp: z.coerce.number(),
});
export type Class = typeof classes.$inferSelect;

export const CreateClassSchema = ClassSchema;
export type CreateClass = z.infer<typeof CreateClassSchema>;
