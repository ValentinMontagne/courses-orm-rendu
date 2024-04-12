import { CharactersSchema, Character } from "./characters.model";
import { createCharactersInRepository } from "./characters.repository";

export async function CreateCharacters(data: unknown): Promise<Character> {
  const playerData = CharactersSchema.parse(data);
  const result = await createCharactersInRepository(playerData);

  return result[0];
}