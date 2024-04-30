import { z } from "zod";
import { monsters } from "../../infrastructure/db/schema";

export const MonsterSchema = z.object({
  id: z.string(),
  name: z.string().min(2),
  xp: z.number().int(),
  power: z.number().int(),
  hp: z.number().int(),
});
export type Monster = typeof monsters.$inferSelect;

export const CreateMonsterSchema = MonsterSchema.omit({ id: true });
export type CreateMonster = z.infer<typeof CreateMonsterSchema>;