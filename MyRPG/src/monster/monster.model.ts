import { monster } from "../infrastructure/db/schema";
import { z } from "zod";

export const MonsterSchema = z.object({
  id: z.string(),
  power: z.string().email(),
  name: z.string().min(2),
  hp : z.string(),
});
export type Monster = typeof monster.$inferSelect;

export const CreateMonsterSchema = MonsterSchema.omit({ id: true });
export type CreateMonster = z.infer<typeof CreateMonsterSchema>;
