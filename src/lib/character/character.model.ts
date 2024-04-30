import { HttpBadRequest, HttpForbidden } from "@httpx/exception";
import { characters } from "../../infrastructure/db/schema";
import { z } from "zod";

export const CharacterSchema = z.object({
    name: z.string().min(2),
    xp: z.coerce.number(),
    classid: z.coerce.number(),
    playerid: z.coerce.number(),
});
export type Character = typeof characters.$inferSelect;

export const CreateCharacterSchema = CharacterSchema;
export type CreateCharacter = z.infer<typeof CreateCharacterSchema>;
