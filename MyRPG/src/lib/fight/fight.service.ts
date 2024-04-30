import { CreateFightSchema, Fight } from "./fight.model";
import {createMonsterInRepository } from "./fight.repository";

export async function createFight(data: unknown): Promise<Fight> {
  const fightData = CreateFightSchema.parse(data);
  const result = await createMonsterInRepository(fightData);

  return result[0];
}