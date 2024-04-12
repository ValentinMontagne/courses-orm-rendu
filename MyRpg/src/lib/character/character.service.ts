import { CreateCharacterSchema, Character } from "./character.model";
import { createCharacterInRepository, findAll, findById, deleteCharacterById, updateCharacterById } from "./character.repository";

export async function createCharacter(data: unknown): Promise<Character> {
  const characterData = CreateCharacterSchema.parse(data);
  const result = await createCharacterInRepository(characterData);

  return result[0];
}

export async function findAllCharacters(): Promise<Character[]> {
    return findAll();
  }

export async function findCharacterById(id: string){
    const characterId = parseInt(id);
    const existingCharacter = await findById(characterId);
    if (!existingCharacter) {
        throw new Error("Personnage non trouvé.");
      }
    return existingCharacter;
}

export async function updateCharacter(id: string, data: Partial<Character>){
    const characterId = parseInt(id);
    const existingCharacter = await findCharacterById(id);
    if (!existingCharacter) {
      throw new Error("Personnage non trouvé.");
    }
    const updatedCharacter = await updateCharacterById(characterId, data);
    if (!updatedCharacter) {
      throw new Error("La mise à jour du personnage a échoué.");
    }
    return updatedCharacter;
}

export async function deleteCharacter(id: string){
    const characterId = parseInt(id);
    return deleteCharacterById(characterId);
  }
  