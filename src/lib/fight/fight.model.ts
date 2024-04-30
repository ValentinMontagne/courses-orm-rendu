import { fights } from "../../infrastructure/db/schema";
import { z } from "zod";

export const fightSchema = z.object({
  id: z.coerce.number(),
  playerId: z.coerce.number(),
  characterId:z.coerce.number(),
  monsterIds:z.coerce.number(),
  currentTurn:z.string(),
  turn:z.string(),
  charactersHP:z.string(),
  monstersHP:z.string(),
  playerACtions:z.string(),
  monsterActions:z.string(),
  status:z.string(),
});
export type Fight = typeof fights.$inferSelect;

export const CreateFightSchema = fightSchema.omit({ id: true });
export type CreateFight = z.infer<typeof CreateFightSchema>;
