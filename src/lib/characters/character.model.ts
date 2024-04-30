import { characters } from "../../infrastructure/db/schema";
import { z } from "zod";

export const CharacterSchema = z.object({
    id: z.string(),
    name: z.string().min(2),
    xp: z.number().int(),
    power: z.number().int(),
    hp: z.number().int(),
    classId: z.number().int(),
    playerId: z.number().int(),
});
export type Character = typeof characters.$inferSelect;

export const CreateCharacterSchema = CharacterSchema.omit({ id: true });
export type CreateCharacter = z.infer<typeof CreateCharacterSchema>;