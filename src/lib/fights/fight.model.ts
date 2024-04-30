import { fight } from "../../infrastructure/db/schema";
import { z } from "zod";
 
export const FightSchema = z.object({
  id: z.string(),
  playerId: z.number(),
  characterIds: z.array(z.number()),
  monsterIds: z.array(z.number()),
  currentTurn: z.enum(['PLAYER', 'MONSTER']), 
  turn: z.number(),
  charactersHP: z.number(),
  monstersHP: z.number(),
  playerActions: z.array(z.string()), 
  monsterActions: z.array(z.string()), 
  status: z.enum(['IN_PROGRESS', 'PLAYER_WON', 'MONSTERS_WON'])
});
export type Fight = typeof fight.$inferSelect;
 
export const CreateFightSchema = FightSchema.omit({ id: true });
export type CreateFight = z.infer<typeof CreateFightSchema>;