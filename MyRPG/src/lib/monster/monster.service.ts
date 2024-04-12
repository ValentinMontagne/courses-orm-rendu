import { CreateMonsterSchema, Monster } from "./monster.model";
import {
  createMonsterInRepository,
  getAllMonstersFromRepository,
  getMonsterByIdFromRepository,
  deleteMonsterFromRepository,
  updateMonsterInRepository
} from "./monster.repository";

export async function createMonster(data: unknown): Promise<Monster> {
  const monsterData = CreateMonsterSchema.parse(data);
  const result = await createMonsterInRepository(monsterData);

  return result[0];
}

export async function getAllMonsters(): Promise<Monster[]> {
  return await getAllMonstersFromRepository();
}

export async function getMonsterById(
  monsterId: number
): Promise<Monster[] | null> {
  return await getMonsterByIdFromRepository(monsterId);
}

export async function deleteMonster(monsterId: number) {
  return await deleteMonsterFromRepository(monsterId);
}

export async function updateMonster(
  monsterId: number,
  updatedMonsterData: Partial<Monster>
): Promise<void> {
  await updateMonsterInRepository(monsterId, updatedMonsterData);
}
