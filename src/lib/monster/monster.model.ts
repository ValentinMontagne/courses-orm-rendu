import { monsters } from "../../infrastructure/db/schema";
import { z } from "zod";

export const monsterSchema = z.object({
  id: z.string(),
  name: z.string().min(2),
  power: z.string(),
  hp: z.string(),
});
export type Monster = typeof monsters.$inferSelect;

export const CreateMonsterSchema = monsterSchema.omit({ id: true });
export type CreateMonster = z.infer<typeof CreateMonsterSchema>;