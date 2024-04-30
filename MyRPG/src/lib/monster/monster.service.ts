import { Monster, CreateMonsterSchema } from "./monster.model"; 
import { createMonsterInRepository, getAllMonstersFromRepository, getMonsterByIdFromRepository,
   } from "./monster.repository"; 


export async function createMonster(data: unknown): Promise<Monster> {
  const monsterData = CreateMonsterSchema.parse(data);
  const result = await createMonsterInRepository(monsterData);
 
  return result[0];
}


export async function getAllMonsters(): Promise<Monster[]> {
  const monsters = await getAllMonstersFromRepository();
  return monsters;
}


export async function getMonsterById(id: string): Promise<Monster | null> {
  const monster = await getMonsterByIdFromRepository(id);
  return monster;
}


