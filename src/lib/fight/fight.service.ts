import { Fight, CreateFightSchema } from "./fight.model";
import { createFightInRepository, getAllFightsFromRepository, getFightByIdFromRepository } from "./fight.repository";

// Fonction pour créer un nouveau combat
export async function createFight(data: unknown): Promise<Fight> {
  const fightData = CreateFightSchema.parse(data);
  const result = await createFightInRepository(fightData);
  return result[0];
}

// Fonction pour récupérer tous les combats
export async function getAllFights(): Promise<Fight[]> {
  const fights = await getAllFightsFromRepository();
  return fights;
}

// Fonction pour récupérer un combat par son identifiant
export async function getFightById(id: string): Promise<Fight | null> {
  const fight = await getFightByIdFromRepository(id);
  return fight;
}
