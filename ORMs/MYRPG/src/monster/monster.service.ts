import { CreateMonsterSchema, Monster } from "./monster.model";
import { createMonsterInRepository } from "./monster.repository";

export async function createMonster(data: unknown): Promise<Monster> {
  const playerData = CreateMonsterSchema.parse(data);
  const result = await createMonsterInRepository(playerData);

  return result[0];
}
