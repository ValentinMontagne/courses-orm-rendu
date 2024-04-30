import { HttpBadRequest, HttpForbidden } from "@httpx/exception";
import { Monster, CreateMonsterSchema } from "./monster.model";
import { createMonsterInRepository, getMonstersInRepository } from "./monster.repository";

export async function createMonster(data: unknown): Promise<Monster> {
  const monster = CreateMonsterSchema.safeParse(data);

  if (!monster.success) {
    throw new HttpBadRequest(monster.error);
  }

  const result = await createMonsterInRepository(monster.data);

  if (!result) {
    throw new HttpForbidden("Monster already exists");
  }

  return result[0];
}

export async function getMonsters(): Promise<Monster[]> {
  const monsters = await getMonstersInRepository();
  return monsters;
}
