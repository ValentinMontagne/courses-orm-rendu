import { Character, CreateCharacterSchema } from "./character.model";
import { createCharacterInRepository, deleteCharacterInRepository, getCharacterByIdInRepository, getCharacterInRepository } from "./character.repository";

export async function createCharacter(data: unknown): Promise<Character> {
  const playerData = CreateCharacterSchema.parse(data);
  const result = await createCharacterInRepository(playerData);

  return result[0];
}

export async function getCharacters() : Promise<Character[]> {
    const result = await getCharacterInRepository()
    return result;
}

export async function deleteCharacter(id : number) : Promise<Character> {
    const result= await deleteCharacterInRepository(id);
    return result[0];
}

export async function getCharacterById(id: number) : Promise<Character> {
  const result = await getCharacterByIdInRepository(id)
  return result[0];
}