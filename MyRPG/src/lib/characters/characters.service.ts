import { CreateCharacterSchema, Character } from "./characters.model";
import { createCharacterInRepository,getAllCharactersInRepository } from "./characters.repository";

export async function createCharacter(data: unknown): Promise<Character> {
  const CharacterData = CreateCharacterSchema.parse(data);
  const result = await createCharacterInRepository(CharacterData);

  return result[0];
}

export async function getAllCharacters(): Promise<Character[]> {
    const characters = await getAllCharactersInRepository();
    return characters;
  }
  