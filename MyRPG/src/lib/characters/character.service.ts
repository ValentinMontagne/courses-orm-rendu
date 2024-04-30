import { HttpBadRequest, HttpForbidden } from "@httpx/exception";
import { Character, CreateCharacterSchema } from "./character.model";
import { createCharacterInRepository, getCharactersInRepository } from "./character.repository";

export async function createCharacter(data: unknown): Promise<Character> {
    const character = CreateCharacterSchema.safeParse(data);

    if (!character.success) {
        throw new HttpBadRequest(character.error);
    }

    const result = await createCharacterInRepository(character.data);

    if (!result) {
        throw new HttpForbidden("Character already exists");
    }

    return result[0];
}

export async function getCharacters(): Promise<Character[]> {
    return getCharactersInRepository()
}