import { z } from "zod";
import {characters} from "../../infrastructure/db/schema";

export const CharacterSchema = z.object({
    id: z.number(),
    name: z.string().min(2),
    xp: z.number(),
    classId: z.number(),
    playerId: z.number()
});

export type Character = typeof characters.$inferSelect

export const CreateCharacterSchema = CharacterSchema.omit({ id: true });
export type CreateCharacter = z.infer<typeof CreateCharacterSchema>;

export const PutCharacterSchema = CharacterSchema.omit({ id: true });
export type PutCharacter = z.infer<typeof PutCharacterSchema>;
