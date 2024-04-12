import { z } from "zod";
import { fights } from "../../infrastructure/db/schema";

export const FightSchema = z.object({
  id: z.string(),
  playerId : z.number(),
  characterIds : z.array(z.number()),
  monsterIds : z.array(z.number()),
  currentTurn : z.enum(["PLAYER","MONSTER"]),
  turn : z.number().default(0),
  charactersHP : z.number().default(0),
  monstersHP : z.number().default(0),
  playerActions :z.array(z.string()).default([]),
  monsterActions :z.array(z.string()).default([]),
  status : z.enum(["IN_PROGRESS","PLAYER_WON","MONSTERS_WON"]).default("IN_PROGRESS")
});
export type Fight = typeof fights.$inferSelect;

export const CreateFightSchema = FightSchema.omit({ id: true, currentTurn : true, turn: true, playerActions : true, monsterActions :true, status : true });
export type CreateFight = z.infer<typeof CreateFightSchema>;
