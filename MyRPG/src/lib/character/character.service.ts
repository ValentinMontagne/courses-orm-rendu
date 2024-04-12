import {
  createCharacterInRepository,
  getAllCharactersFromRepository,
  getCharacterByIdRepository,
  deleteCharacterInRepository,
  updateCharacterInRepository
} from "./character.repository";
import { CreateCharacterSchema, Character } from "./character.model";

export async function createCharacter(data: unknown): Promise<Character> {
  const characterData = CreateCharacterSchema.parse(data);
  const result = await createCharacterInRepository(characterData);

  return result[0];
}

export async function getAllCharacters(): Promise<Character[]> {
  return await getAllCharactersFromRepository();
}

export async function getCharacterById(
  characterId: number
): Promise<Character[] | null> {
  return await getCharacterByIdRepository(characterId);
}

export async function deleteCharacter(characterId: number) {
  return await deleteCharacterInRepository(characterId);
}

export async function updateCharacter(
  characterId: number,
  updatedCharacterData: Partial<Character>
): Promise<void> {
  await updateCharacterInRepository(characterId, updatedCharacterData);
}