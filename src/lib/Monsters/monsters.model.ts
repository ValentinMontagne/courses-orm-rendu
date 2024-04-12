import { z } from "zod";
import {monsters} from "../../infrastructure/db/schema";


export const MonsterSchema = z.object({
    id: z.string(),
    name: z.string().min(2),
    power: z.number().positive(),
    hp: z.number().positive()
});
export type Monster = typeof monsters.$inferSelect;

export const CreateMonsterSchema = MonsterSchema.omit({ id: true });
export const UpdateMonsterSchema = MonsterSchema.omit({ id: true });
export type CreateMonster = z.infer<typeof CreateMonsterSchema>;
export type UpdateMonster = z.infer<typeof UpdateMonsterSchema>;

