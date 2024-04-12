import { CreateMonsterSchema, Monster } from "./monster.model";
import { createMonsterInRepository, deleteMonsterInRepository, getMonsterByIdInRepository, getMonstersInRepository } from "./monster.repository";

export async function createMonster(data: unknown): Promise<Monster> {
  const monsterData = CreateMonsterSchema.parse(data);
  const result = await createMonsterInRepository(monsterData);

  return result[0];
}

export async function getMonsters() : Promise<Monster[]> {
    const result = await getMonstersInRepository()
    return result;
}

export async function getMonstersById(id: number) : Promise<Monster> {
    const result = await getMonsterByIdInRepository(id)
    return result[0];
}

export async function deleteMonster(id : number) : Promise<Monster> {
    const result= await deleteMonsterInRepository(id);
    return result[0];
}
