import {z} from "zod";
import {monsters} from "../../infrastructure/db/schema";


export const MonsterSchema = z.object({
    id: z.string(),
    name: z.string().min(2),
    power: z.number().int(),
    hp: z.number().int(),
    xpGiven: z.number().int(),
});
export type Monster = typeof monsters.$inferSelect;

export const CreateMonsterSchema = MonsterSchema.omit({ id: true });
export type CreateMonster = z.infer<typeof CreateMonsterSchema>;