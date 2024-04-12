import {z} from "zod";
import {fights} from "../../infrastructure/db/schema";

    export const FightSchema = z.object({
        id: z.string(),
        playerId: z.number().int(),
        charactersId: z.number().int().array(),
        monstersId: z.number().int().array(),
        currentTurn: z.enum(["PLAYER", "MONSTER"]),
        turn: z.number().int(),
        charactersHP: z.number().int(),
        monstersHP: z.number().int(),
        playerActions: z.string().array(),
        monsterActions: z.string().array(),
        status: z.enum(["IN_PROGRESS", "PLAYER_WON", "MONSTER_WON"]),
    });

export interface FightUpdate {
    playerActions: string[];
    monsterActions: string[];
}
export type Fight = typeof fights.$inferSelect;

export const CreateFightSchema = FightSchema.omit({ id: true });
export const CreateFightUpdateScheme = FightSchema.pick({ playerActions: true, monsterActions: true });
export type CreateFight = z.infer<typeof CreateFightSchema>;
export type UpdateFight = z.infer<typeof CreateFightUpdateScheme>;