import { z } from "zod";
import { characters } from "../../infrastructure/db/schema";

export const CharacterSchema = z.object({
    id: z.string(),
    name: z.string(),
    xp: z.number(),
    playerid: z.number(),
    classid: z.number()
})
export type Character = typeof characters.$inferInsert;

export const CreateCharacterSchema = CharacterSchema.omit({id : true});
export type CreateCharacter = z.infer<typeof CreateCharacterSchema>