import { Character, CreateCharacterSchema } from "./character.model";
import { createCharacterInRepository, getAllCharacterInRepository } from "./character.repository";

export async function createCharacter(data:unknown): Promise<Character> {
    const characterData = CreateCharacterSchema.parse(data);
    const result = await createCharacterInRepository(characterData);

    return result[0];
}

export async function getAllCharacter(): Promise<Character[]> {
    const result = await getAllCharacterInRepository();
    return result;
}