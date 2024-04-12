import {Character, CharacterLeftJoin, CreateCharactersSchema, UpdateCharactersSchema} from "./characters.model";
import {
    createCharacterInRepository, deleteCharacterByIdInteRepository,
    getAllCharacterInRepository,
    getCharacterByIdInRepository, updateCharacterByIdInRepository
} from "./characters.repository";
import {HttpBadRequest, HttpNotFound} from "@httpx/exception";
import {UpdateClasseSchema} from "../classes/classes.model";
import {deleteClasseByIdInteRepository, updateClasseByIdInRepository} from "../classes/classes.repository";


export async function getAllCharacter(): Promise<CharacterLeftJoin[]> {
    const result = await getAllCharacterInRepository()
    if (result.length === 0){
        throw new HttpNotFound();
    }
    return result ;
}

export async function getCharacterById(data: number): Promise<CharacterLeftJoin> {
    const result = await getCharacterByIdInRepository(data);
    if (result.length === 0){
        throw new HttpNotFound();
    }
    return result[0];
}

export async function createCharacter(data: any): Promise<Character> {
    const characterData = CreateCharactersSchema.safeParse(data);
    if (characterData.success){
        const result = await createCharacterInRepository(data);
        return result[0];
    }else {
        throw new HttpBadRequest(characterData.error);
    }
}
export async function updateCharacterById(id: number, data: any){
    const characterData = UpdateCharactersSchema.safeParse(data);
    if (characterData.success){
        const updatedCharacter = await updateCharacterByIdInRepository(id, data);
        if (updatedCharacter.length === 0) {
            throw new HttpNotFound()
        }
        return updatedCharacter[0];
    }else {
        throw new HttpBadRequest(characterData.error);
    }
}

export async function deleteCharacterById(id: number){
    const deleteCharacter = await deleteCharacterByIdInteRepository(id);
    if (deleteCharacter.length === 0) {
        throw new HttpNotFound()
    }
    return deleteCharacter[0];
}
