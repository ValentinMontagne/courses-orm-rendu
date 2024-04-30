import { characters } from "../../infrastructure/db/schema";
import { z } from "zod";

export const characterSchema = z.object({
  id: z.string(),
  xp: z.string(),
  name: z.string().min(2),
  classId: z.number(),
  playerId: z.number(),
});
export type Character = typeof characters.$inferSelect;

export const CreateCharacterSchema = characterSchema.omit({ id: true });
export type CreateCharacter = z.infer<typeof CreateCharacterSchema>;
