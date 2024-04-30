
import { db } from "../../infrastructure";
import { fights } from "../../infrastructure/db/schema";
import { CreateFights } from "./fights.models";
 
export function createClasseInRepository(data: CreateFights) {
  return db.insert(fights).values(data).returning();
}

export async function getAllFightsInRepository() {
    const result = await db.select().from(fights);
    return result;
  }