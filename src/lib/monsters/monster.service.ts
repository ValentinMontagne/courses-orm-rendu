import { CreateMonsterSchema, Monster } from "./monster.model";
import { createMonsterInRepository, deleteMonsterInRepository, getAllMonstersInRepository, getMonsterInRepository, updateMonsterInRepository } from "./fight";

export async function createMonster(data: unknown): Promise<Monster> {
  const monsterData = CreateMonsterSchema.parse(data);
  const result = await createMonsterInRepository(monsterData);

  return result[0];
}

export async function getAllMonsters(): Promise<Monster[]> {
  return await getAllMonstersInRepository();
}

export async function getMonsterById(monsterId: number): Promise<Monster[]> {
  return await getMonsterInRepository(monsterId);
}

export async function updateMonsterById(monsterId: number, updatedMonsterData: Partial<Monster>): Promise<void> {
  await updateMonsterInRepository(monsterId, updatedMonsterData);
}


export async function deleteMonsterById(monsterId: number) {
  return await deleteMonsterInRepository(monsterId);
}