import { CreateCharacterSchema, Character } from "./character.model";
import { createCharacterInRepository, deleteCharacterInRepository, getAllCharactersInRepository, getCharacterInRepository, updateCharacterInRepository } from "./character.repository";

export async function createCharacter(data: unknown): Promise<Character> {
  const characterData = CreateCharacterSchema.parse(data);
  const result = await createCharacterInRepository(characterData);

  return result[0];
}

export async function getAllCharacters(): Promise<Character[]> {
  return await getAllCharactersInRepository();
}

export async function getCharacterById(characterId: number): Promise<Character[]> {
  return await getCharacterInRepository(characterId);
}

export async function updateCharacterById(characterId: number, updatedCharacterData: Partial<Character>): Promise<void> {
  await updateCharacterInRepository(characterId, updatedCharacterData);
}


export async function deleteCharacterById(characterId: number) {
  return await deleteCharacterInRepository(characterId);
}