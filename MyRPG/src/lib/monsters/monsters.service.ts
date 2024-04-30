import { CreateMonsterSchema, Monster } from "./monsters.model";
import { createMonsterInRepository,getAllMonstersInRepository } from "./monsters.repository";

export async function createMonster(data: unknown): Promise<Monster> {
  const MonsterData = CreateMonsterSchema.parse(data);
  const result = await createMonsterInRepository(MonsterData);

  return result[0];
}

export async function getAllMonsters(): Promise<Monster[]> {
    const monsters = await getAllMonstersInRepository();
    return monsters;
  }
  