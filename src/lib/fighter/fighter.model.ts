import { HttpBadRequest, HttpForbidden } from "@httpx/exception";
import { fighters } from "../../infrastructure/db/schema";
import { z } from "zod";

export const FighterSchema = z.object({
    name: z.string().min(2),
    power: z.coerce.number(),
    hp: z.coerce.number(),
    playerId: z.coerce.number(),
    characterIds: z.coerce.number(),
    monsterIds: z.coerce.number(),
    currentTurn: z.enum(),
    turn: z.coerce.number(),
    charactersHP: z.coerce.number(),
    monstersHP: z.coerce.number(),
    playerActions: z.array(z.string()),
    monsterActions: z.array(z.string()),
    status: z.enum();
});
export type Fighter = typeof fighters.$inferSelect;

export const CreateFighterSchema = FighterSchema;
export type CreateFighter = z.infer<typeof CreateFighterSchema>;
