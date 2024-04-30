import { Character, CreateCharacterSchema } from "./character.model";
import { UpdateCharacterInRepository, createCharacterInRepository, deleteCharacterFromRepository, getAllCharactersFromRepository, getCharacterByIdFromRepository } from "./character.repository";

export async function createCharacter(data: unknown): Promise<Character> {
  const characterData = CreateCharacterSchema.parse(data);
  const result = await createCharacterInRepository(characterData);
 
  return result[0];
}

export async function getAllCharacters(): Promise<Character[]> {
  const characters = await getAllCharactersFromRepository();
  return characters;
}

export async function getCharacterById(id: string): Promise<Character | null> {
  const character = await getCharacterByIdFromRepository(id);
  return character;
}

export async function updateCharacterById(id: number): Promise<Character> {
  const result = await UpdateCharacterInRepository(id);
  return result[0];
}

export async function deleteCharacter(id: string): Promise<void> {
  await deleteCharacterFromRepository(id);
}

