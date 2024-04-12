import { CreateCharacterSchema, Character } from "./model";
import { createCharacterInRepository } from "./repository";

export async function createCharacter(data: unknown): Promise<Character> {
  const characterData = CreateCharacterSchema.parse(data);
  const result = await createCharacterInRepository(characterData);

  return result[0];
}
