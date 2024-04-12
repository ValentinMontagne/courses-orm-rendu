import { characters } from "../../infrastructure/db/schema";
import { z } from "zod";

export const CharacterSchema = z.object({
    id: z.string(),
    name: z.string().min(2),
    xp: z.number().int(),
    level: z.number().int(),
    classId: z.number().int(),
    playerId: z.number().int(),
});

export interface CharacterWithClass {
    id: number;
    name: string;
    xp: number;
    level: number;
    classId: number;
    playerId: number;
    class: {
        id: number;
        name: string;
        power: number;
        hp: number;
    };
}
export type Character = typeof characters.$inferSelect;

export const CreateCharacterSchema = CharacterSchema.omit({ id: true });
export type CreateCharacter = z.infer<typeof CreateCharacterSchema>;