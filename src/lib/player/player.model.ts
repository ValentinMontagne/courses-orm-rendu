import { players } from "../../infrastructure/db/schema";
import { z } from "zod";

export const PlayerSchema = z.object({
  id: z.string(),
  email: z.string().email(),
  name: z.string().min(4),
});
export type Player = typeof players.$inferSelect;

export const CreatePlayerSchema = PlayerSchema.omit({ id: true });
export type CreatePlayer = z.infer<typeof CreatePlayerSchema>;
