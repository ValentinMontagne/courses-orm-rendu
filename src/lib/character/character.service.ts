import { CreateCharacterSchema, Character } from "./character.model";
import { createCharacterInRepository, getCharactersInRepository } from "./character.repository";

export async function createCharacterService(data: unknown): Promise<Character> {
    const classeData = CreateCharacterSchema.parse(data);
    const result = await createCharacterInRepository(classeData);

    return result[0];
}

export async function getAllCharacters(): Promise<Character[]> {
    const result = await getCharactersInRepository();
    return result;
}