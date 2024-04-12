import { characters } from "../../infrastructure/db/schema";
import { z } from "zod";

export const CharacterSchema = z.object({
    id: z.string(),
    name: z.string().min(2),
    xp: z.coerce.number(),
    classId: z.coerce.number(),
    playerId: z.coerce.number(),
});
export type Character = typeof characters.$inferSelect;

export const CreateCharacterSchema = CharacterSchema.omit({ id : true});
export type CreateCharacter = z.infer<typeof CreateCharacterSchema>;