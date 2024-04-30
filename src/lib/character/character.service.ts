import { CreateCharacterSchema, Character } from "./character.model";
import { createCharacterInRepository } from "./character.repository";

export async function createCharacter(data: unknown): Promise<Character> {
    const characterData = CreateCharacterSchema.parse(data);
    const result = await createCharacterInRepository(characterData);

    return result[0];
}
