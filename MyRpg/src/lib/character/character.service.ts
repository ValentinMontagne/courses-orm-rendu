import { CreateCharacterSchema, Character } from "./character.model";
import { createCharacterInRepository, findAll, findById, deleteCharacterById, updateCharacterById } from "./character.repository";
import { HttpBadRequest, HttpNotFound } from "@httpx/exception"

export async function createCharacter(data: unknown){
  const characterData = CreateCharacterSchema.parse(data);
  const result = await createCharacterInRepository(characterData);

  return result[0];
}

export async function findAllCharacters(){
    return findAll();
  }

export async function findCharacterById(id: string){
    const characterId = parseInt(id);
    const existingCharacter = await findById(characterId);
    if (!existingCharacter) {
        throw new HttpNotFound("Personnage non trouvé.");
      }
    return existingCharacter[0];
}

export async function updateCharacter(id: string, data: Partial<Character>){
    const characterId = parseInt(id);
    const existingCharacter = await findCharacterById(id);
    if (!existingCharacter) {
      throw new HttpNotFound("Personnage non trouvé.");
    }
    const updatedCharacter = await updateCharacterById(characterId, data);
    if (!updatedCharacter) {
      throw new HttpBadRequest("La mise à jour du personnage a échoué.");
    }
    return updatedCharacter;
}

export async function deleteCharacter(id: string){
    const characterId = parseInt(id);
    return deleteCharacterById(characterId);
  }
  