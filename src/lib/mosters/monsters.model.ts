import { z } from "zod";
import { monsters } from "../../infrastructure/db/schema";


export const monstersScheman = z.object({
    id: z.number(),
    name: z.string().min(2),
    power: z.string(),
    hp: z.number(),
})

export type Monster = typeof monsters.$inferSelect;

export const CreateMonsterSchema = monstersScheman.omit({ id: true });
export type CreateMonster = z.infer<typeof CreateMonsterSchema>;
