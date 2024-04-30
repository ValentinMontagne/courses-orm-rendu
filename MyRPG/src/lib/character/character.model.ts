import { characters } from "../../infrastructure/db/schema";
import { z } from "zod";

export const characterSchema = z.object({
    id:z.coerce.number(),
    name:z.string(),
    xp:z.string(),
    classId:z.coerce.number(),
    playerId:z.coerce.number(),
});
export type character = typeof characters.$inferSelect;

export const CreateCharacterSchema = characterSchema.omit({ id: true });
export type CreateCharacter = z.infer<typeof CreateCharacterSchema>;
