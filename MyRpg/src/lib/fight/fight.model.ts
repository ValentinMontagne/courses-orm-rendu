import {fights} from "../../infrastructure/db/schema";
import {array, z} from "zod";


export const FightSchema = z.object({
    id: z.string(),
    playerId: z.number(),
    characterIds: z.array(z.coerce.number()),
    monsterIds : z.array(z.coerce.number()),
    currentTurn : z.enum(["PLAYER", "MONSTRE"]),
    turn: z.number(),
    charactersHP : z.number(),
    monstersHP : z.number(),
    playerActions : z.array(z.string()),
    monsterActions  : z.array(z.string()),
    status  : z.enum(["IN_PROGRESS", "PLAYER_WON","MONSTERS_WON"]),
});

export interface attackModel{
    currentActions : string,
}
export type Fight = typeof fights.$inferSelect;

export const CreateFightSchema = FightSchema.omit({ id: true , turn: true, charactersHP: true, monstersHP: true, playerActions: true, monsterActions: true, status: true});
export const NoIdFightSchema = FightSchema.omit({ id: true });
export type CreateFight = z.infer<typeof CreateFightSchema>;
export type UpdateFight = z.infer<typeof NoIdFightSchema>;
export type NoIdFight = z.infer<typeof NoIdFightSchema>;
