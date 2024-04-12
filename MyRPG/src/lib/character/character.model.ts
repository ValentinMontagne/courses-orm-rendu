import { characters } from "../../infrastructure/db/schema";
import { z } from "zod";

export const CharacterSchema = z.object({
  id: z.string().optional(),
  name: z.string(),
  xp: z.number().nonnegative(),
  classId: z.number(),
  playerId: z.number(),
});
export type Character = typeof characters.$inferSelect;

export const CreateCharacterSchema = CharacterSchema.omit({ id: true });
export type CreateCharacter = z.infer<typeof CreateCharacterSchema>;
