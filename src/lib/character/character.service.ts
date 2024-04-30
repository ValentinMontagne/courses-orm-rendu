import { CreateCharacterSchema, Character } from "./character.model";
import { createCharacterInRepository } from "./character.repository";

export async function createCharacter(data: unknown): Promise<Character> {
  const CharacterData = CreateCharacterSchema.parse(data);
  const result = await createCharacterInRepository(CharacterData);

  return result[0];
}