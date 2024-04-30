import {monsters, players} from "../../infrastructure/db/schema";
import { z } from "zod";
import {CharacterSchema} from "../characters/character.model";

export const MonsterSchema = z.object({
    id: z.string(),
    name: z.string().min(2),
    power: z.number(),
    hp: z.number(),
});
export type Monster = typeof monsters.$inferSelect;

export const CreateMonsterSchema = MonsterSchema.omit({ id: true });
export type CreateMonster = z.infer<typeof CreateMonsterSchema>;

export const PutMonsterSchema = MonsterSchema.omit({ id: true });
export type PutMonster = z.infer<typeof PutMonsterSchema>;
