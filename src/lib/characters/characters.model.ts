
import {characters, players} from "../../infrastructure/db/schema";
import { z } from "zod";
import {Classe} from "../classes/classes.model";
import {Player} from "../player/player.model";

export const CharactersSchema = z.object({
    id: z.string(),
    name: z.string().min(2),
    xp: z.number().positive(),
    classId: z.number(),
    playerId: z.number(),
});
export interface CharacterLeftJoin{
    id: number,
    name : string,
    xp: number,
    class: Classe | null ,
    player: Player | null
}
export type Character = typeof characters.$inferSelect;

export const CreateCharactersSchema = CharactersSchema.omit({ id: true });
export const UpdateCharactersSchema = CharactersSchema.omit({ id: true });

export type CreateCharacter = z.infer<typeof CreateCharactersSchema>;
export type UpdateCharacter = z.infer<typeof UpdateCharactersSchema>;
