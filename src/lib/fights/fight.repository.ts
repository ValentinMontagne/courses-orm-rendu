import { sql } from "drizzle-orm";
import { db } from "../../infrastructure/db";
import { CreateFight } from "./fight.model";
import { fight } from "../../infrastructure/db/schema";
 
export function createPlayerInRepository(data: CreateFight) {
  return db.insert(fight).values(data).returning();
}

export async function getAllFightsFromRepository() {
    const result = await db.select().from(fight);
    return result;
  }

  export async function getFightByIdFromRepository(fightId: string) {
    const result = await db.select().from(fight).where(sql`${fight.id} = ${fightId}`).limit(1);
    return result[0] || null;
  }