import { characters } from "../../infrastructure/db/schema";
import { z } from "zod";

export const CharacterSchema = z.object({
  id: z.number(),
  name: z.string(),
  xp: z.string(),
  classId: z.number(),
  playerId: z.number(),
});
export type Character = typeof characters.$inferSelect;

export const CreateCharacterSchema = CharacterSchema.omit({ id: true });
export type CreateCharacter = z.infer<typeof CreateCharacterSchema>;