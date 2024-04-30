import { characters } from "../../infrastructure/db/schema";
import { z } from "zod";

export const CharacterSchema = z.object({
    id: z.string(),
    xp: z.number().int(),
    name: z.string(),
    classId: z.number().int(),
    playerId: z.number().int(),
});

export type Character = typeof characters.$inferSelect;

export const CreateCharacterSchema = CharacterSchema.omit({ id: true });
export type CreateCharacter = z.infer<typeof CreateCharacterSchema>;
