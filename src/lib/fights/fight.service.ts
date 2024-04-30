import { CreateFightSchema, Fight } from "./fight.model";
import {
  createPlayerInRepository,
  getAllFightsFromRepository,
  getFightByIdFromRepository,
} from "./fight.repository";

export async function createFight(data: unknown): Promise<Fight> {
  const playerData = CreateFightSchema.parse(data);
  const result = await createPlayerInRepository(playerData);

  return result[0];
}

export async function getAllFight(): Promise<Fight[]> {
  const player = await getAllFightsFromRepository();
  return player;
}

export async function getFightById(id: string): Promise<Fight | null> {
  const player = await getFightByIdFromRepository(id);
  return player;
}
