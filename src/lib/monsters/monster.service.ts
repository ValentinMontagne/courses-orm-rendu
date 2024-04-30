
import { CreateMonsterSchema, Monster } from "./monster.model";
import { createMonsterInRepository, getAllMonstersInRepository, getMonsterByIdFromRepository } from "./monster.repository";

export async function createMonster(data: unknown): Promise<Monster> {
  const MonsterData = CreateMonsterSchema.parse(data);
  const result = await createMonsterInRepository(MonsterData);

  return result[0];
}

export async function getAllMonsters(): Promise<Monster[]> {
    const monsters = await getAllMonstersInRepository();
    return monsters;
  }

export async function getMonsterById(id: string): Promise<Monster | null> {
  const classes = await getMonsterByIdFromRepository(id);
  return classes;
}