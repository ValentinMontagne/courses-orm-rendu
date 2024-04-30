import {array, z} from "zod";
import {characters, classes, fights} from "../../infrastructure/db/schema";
import {MonsterSchema} from "../monster/monster.model";
export enum statusType {
    IN_PROGRESS = 'IN_PROGRESS',
    PLAYER_WON = 'PLAYER_WON',
    MONSTERS_WON = 'MONSTERS_WON',
}

export enum turnType {
    PLAYER = 'PLAYER',
    MONSTER = 'MONSTER',
}

export const FightSchema = z.object({
    id: z.string(),
    playerIds: z.array(z.number()),
    monsterIds: z.array(z.number()),
    currentTurn: z.nativeEnum(turnType),
    turn: z.number(),
    charactersHP: z.number(),
    monstersHP: z.number(),
    playerActions: z.array(z.string()),
    monsterActions: z.array(z.string()),
    status: z.nativeEnum(statusType)
});

export type Fight = typeof fights.$inferSelect;



// DTO , SCHEMA POUR LE POST
export const CreateFightDtoSchema = FightSchema.omit({
        id: true,
        monstersHP: true,
        charactersHP: true,
        status: true,
        currentTurn: true,
        turn: true,
        playerActions: true,
        monsterActions: true
    });
export type CreateFighDTO = z.infer<typeof CreateFightDtoSchema>;


// SCHEMA DE CREATION DANS LE REPOSITORY
export const CreateFightSchema = FightSchema.omit({
    id: true,
});
export type CreateFight = z.infer<typeof CreateFightSchema>;

export const PutFightSchema = FightSchema.omit({
    id: true,
    playerIds: true,
    monsterIds: true,
    monstersHP: true,
    charactersHP: true,
});
export type PutFight = z.infer<typeof PutFightSchema>;
