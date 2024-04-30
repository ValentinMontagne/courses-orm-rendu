import { Character, CreateCharacterSchema } from "./characters.model";
import { createCharactersInRepository, deleteCharactersInRepository, getCharactersInRepository, updateCharactersInRepository } from "./characters.repository";


export async function CreateCharacter(data: unknown): Promise<Character> {
  const charactersData = CreateCharacterSchema.parse(data);
  const result = await createCharactersInRepository(charactersData);

  return result[0];
}

export async function DeleteCharacter(id: string): Promise<Character> {
  const result = await deleteCharactersInRepository(id);

  return result[0];
}

export async function GetCharacter(): Promise<Character[]> {
  const result = await getCharactersInRepository();

  return result;
}

export async function UpdateCharacter(id: string): Promise<Character> {
  const result = await updateCharactersInRepository(id);

  return result[0];
}