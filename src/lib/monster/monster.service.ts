import { CreateMonsterSchema, Monster } from "./monster.model";
import { createMonsterInRepository } from "./monster.repository";

export async function createMonster(data: unknown): Promise<Monster> {
  const MonsterData = CreateMonsterSchema.parse(data);
  const result = await createMonsterInRepository(MonsterData);

  return result[0];
}
