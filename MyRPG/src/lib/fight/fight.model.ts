import { fights } from "../../infrastructure/db/schema";
import { z } from "zod";

export const fightSchema = z.object({
  id: z.coerce.number(),
  playerId: z.coerce.number(),
  characterId:z.coerce.number(),
  monsterIds:z.coerce.number(),
  currentTurn:z.enum(['PLAYER', 'MONSTER']),
  turn:z.string(),
  charactersHP:z.string(),
  monstersHP:z.string(),
  playerACtions:z.string(),
  monsterActions:z.string(),
  status:z.enum(['IN_PROGRESS','PLAYER_WON','MONSTER_WON']),
});
export type Fight = typeof fights.$inferSelect;

export const CreateFightSchema = fightSchema.omit({ id: true });
export type CreateFight = z.infer<typeof CreateFightSchema>;