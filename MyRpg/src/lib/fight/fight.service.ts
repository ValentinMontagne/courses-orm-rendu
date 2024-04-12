import { CreateFightSchema, Fight } from "./fight.model";
import { createFightInRepository, findAll, findById, deleteFightById, updateFightById } from "./fight.repository";
import { HttpBadRequest, HttpNotFound } from "@httpx/exception"

export async function createFight(data: unknown){
  const fightData = CreateFightSchema.parse(data);
  const result = await createFightInRepository(fightData);

  return result[0];
}

export async function findAllFights(){
    return findAll();
  }

export async function findFightById(id: string){
    const fightId = parseInt(id);
    const existingFight = await findById(fightId);
    if (!existingFight) {
        throw new HttpNotFound("Combat non trouvé.");
      }
    return existingFight;
}

export async function updateFight(id: string, data: Partial<Fight>){
    const fightId = parseInt(id);
    const existingFight = await findFightById(id);
    if (!existingFight) {
      throw new HttpNotFound("Combat non trouvé.");
    }
    const updatedFight = await updateFightById(fightId, data);
    if (!updatedFight) {
      throw new HttpBadRequest("La mise à jour du combat a échoué.");
    }
    return updatedFight;
}

export async function deleteFight(id: string){
    const fightId = parseInt(id);
    return deleteFightById(fightId);
  }
  