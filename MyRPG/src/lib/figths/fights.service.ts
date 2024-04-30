import { CreateFightSchema, Fight } from "./fights.models";
import { createClasseInRepository,getAllFightsInRepository } from "./fights.repository";

export async function createFight(data: unknown): Promise<Fight> {
  const FightData = CreateFightSchema.parse(data);
  const result = await createClasseInRepository(FightData);

  return result[0];
}

export async function getAllFights(): Promise<Fight[]> {
    const fights = await getAllFightsInRepository();
    return fights;
  }
  