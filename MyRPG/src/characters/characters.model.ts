
import { z } from "zod";
import { characters } from "../infrastructure/db/schema";

export const CharactersSchema = z.object({
  id: z.string(),
  xp: z.coerce.number(),
  name: z.string().min(2),
  playerId: z.coerce.number(),
  classId: z.coerce.number(),
});
export type Character = typeof characters.$inferSelect;

export const CreateCharactersSchema = CharactersSchema.omit({ id: true });
export type CreateCharactersSchema = z.infer<typeof CreateCharactersSchema>;