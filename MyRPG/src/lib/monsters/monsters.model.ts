import { monsters } from "../../infrastructure/db/schema";
import { z } from "zod";

export const MonsterSchema = z.object({
    id: z.string(),
    name: z.string(),
    power: z.number().int(),
    hp: z.number().int(),
});
export type Monster = typeof monsters.$inferSelect;

export const CreateMonsterSchema = MonsterSchema.omit({ id: true });
export type CreateMonster = z.infer<typeof CreateMonsterSchema>;
