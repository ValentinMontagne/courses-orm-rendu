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
export type Fight = typeof fights.$inferSelect;

export const CreateFightSchema = FightSchema.omit({ id: true });
export const UpdateFightSchema = FightSchema.omit({ id: true });
export type CreateFight = z.infer<typeof CreateFightSchema>;
export type UpdateFight = z.infer<typeof UpdateFightSchema>;