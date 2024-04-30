import {
    Character,
    CreateCharacterSchema,
    PutCharacterSchema
} from "./character.model";
import {
    createCharacterInRepository,
    findAllInCharacterRepository,
    findIdInCharacterRepository, putCharacterRepository
} from "./character.repository";


export async function createCharacter(data: unknown): Promise<Character> {
    const playerData = CreateCharacterSchema.parse(data);
    const result = await createCharacterInRepository(playerData);

    return result[0];
}

export async function PutCharacter(data: unknown,id: number): Promise<Character> {
    const playerData = PutCharacterSchema.parse(data);
    const result = await putCharacterRepository(playerData,id);

    return result[0];
}

export async function findAllCharacter(): Promise<any> {
    return findAllInCharacterRepository();
}

export async function findIdCharacter(id: number): Promise<any> {
    return findIdInCharacterRepository(id);
}
