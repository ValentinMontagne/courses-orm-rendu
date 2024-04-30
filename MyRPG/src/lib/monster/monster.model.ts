import { monsters } from "../../infrastructure/db/schema";
import { z } from "zod";

export const MonsterSchema = z.object({
    id:z.coerce.number(),
    name:z.string(),
    power:z.coerce.number(),
    hp:z.coerce.number(),
});
export type Monster = typeof monsters.$inferSelect;

export const CreateMonsterSchema = MonsterSchema.omit({ id: true });
export type CreateMonster = z.infer<typeof CreateMonsterSchema>;
