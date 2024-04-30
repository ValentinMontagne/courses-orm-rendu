import { z } from "zod";
import { classes } from "../../infrastructure/db/schema";

export const ClassesSchema = z.object({
    id: z.number(),
    name: z.string().min(2),
    power: z.number(),
    hp: z.number(),
  });
  
  export type Classes = typeof classes.$inferSelect;
  export const CreateClassesSchema = ClassesSchema.omit({ id: true });
  export type CreateClasses = z.infer<typeof CreateClassesSchema>;
  