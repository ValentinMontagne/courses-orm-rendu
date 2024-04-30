import { HttpBadRequest, HttpForbidden } from "@httpx/exception";
import { monsters } from "../../infrastructure/db/schema";
import { z } from "zod";

export const MonsterSchema = z.object({
    name: z.string().min(2),
    power: z.coerce.number(),
    hp: z.coerce.number(),
});
export type Monster = typeof monsters.$inferSelect;

export const CreateMonsterSchema = MonsterSchema;
export type CreateMonster = z.infer<typeof CreateMonsterSchema>;
