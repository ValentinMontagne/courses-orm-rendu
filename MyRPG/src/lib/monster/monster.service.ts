import { CreateMonsterSchema, Monster } from "./monster.model";
import { createMonsterInRepository } from "./monster.repository";


export async function createMonster(data: unknown): Promise<Monster> {
  const monsterData = CreateMonsterSchema.parse(data);
  const result = await createMonsterInRepository(monsterData);

  return result[0];
}
