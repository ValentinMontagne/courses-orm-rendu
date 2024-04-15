import { CreateMonsterSchema, Monster } from "./monster.model";
import { createMonsterInRepository, findAll, findById, deleteMonsterById, updateMonsterById } from "./monster.repository";
import { HttpBadRequest, HttpNotFound } from "@httpx/exception"

export async function createMonster(data: unknown){
  const monsterData = CreateMonsterSchema.parse(data);
  const result = await createMonsterInRepository(monsterData);

  return result[0];
}

export async function findAllMonsters(){
    return findAll();
  }

export async function findMonsterById(id: string): Promise<Monster>{
    const monsterId = parseInt(id);
    const existingMonster = await findById(monsterId);
    if (!existingMonster) {
        throw new HttpNotFound("Monstre non trouvé.");
      }
    return existingMonster[0];
}

export async function updateMonster(id: string, data: Partial<Monster>){
    const monsterId = parseInt(id);
    const existingMonster = await findMonsterById(id);
    if (!existingMonster) {
      throw new HttpNotFound("Monstre non trouvé.");
    }
    const updatedMonster = await updateMonsterById(monsterId, data);
    if (!updatedMonster) {
      throw new HttpBadRequest("La mise à jour du monstre a échoué.");
    }
    return updatedMonster;
}

export async function deleteMonster(id: string){
    const monsterId = parseInt(id);
    return deleteMonsterById(monsterId);
  }
  