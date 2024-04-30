import { CreateFightSchema, Fight } from "./fight.model";
import { createFightInRepository } from "./fight.repository";

export async function createFight(data: unknown): Promise<Fight> {
  const FightData = CreateFightSchema.parse(data);
  
  const result = await createFightInRepository(FightData);

  return result[0];
}

