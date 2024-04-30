import { CreateCharacterSchema, Character } from "./character.model";
import { createCharacterInRepository, getCharactersFromRepository } from "./character.repository";

export async function createCharacter(data: unknown): Promise<Character> {
  const characterData = CreateCharacterSchema.parse(data);
  const result = await createCharacterInRepository(characterData);

  return result[0];
}


export async function getCharacters(): Promise<Character[]> {
  const characters = await getCharactersFromRepository();
  return characters;
}


