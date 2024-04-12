import { CreateCharacterSchema, Character } from "./character.model";
import {
    createCharacterInRepository,
    deleteCharacterByIdFromRepository,
    getCharacterByIdFromRepository, updateCharacterByIdFromRepository
} from "./character.repository";

export async function createCharacter(data: unknown): Promise<Character> {
    const playerData = CreateCharacterSchema.parse(data);
    const result = await createCharacterInRepository(playerData);

    return result[0];
}

export async function getCharacterById(characterId: number): Promise<Character | null> {
    const character = await getCharacterByIdFromRepository(characterId);

    if (!character) {
        return null;
    }

    return character;
}

export async function deleteCharacterById(characterId: number): Promise<void> {
    const character = await deleteCharacterByIdFromRepository(characterId);
}

export async function updateCharacterById(characterId: number, data: unknown): Promise<Character | null> {
    const playerData = CreateCharacterSchema.parse(data);
    const result = await updateCharacterByIdFromRepository(characterId, playerData);

    return result[0];
}