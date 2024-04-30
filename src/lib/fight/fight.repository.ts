import { sql } from "drizzle-orm";
import { db } from "../../infrastructure/db";
import { fights } from "../../infrastructure/db/schema"; // Importez le schéma des combats


export function createFightInRepository(data: any) {
  return db.insert(fights).values(data).returning();
}


export async function getAllFightsFromRepository() {
  const result = await db.select().from(fights);
  return result;
}


export async function getFightByIdFromRepository(fightId: string) {
  const result = await db.select().from(fights).where(sql`${fights.id} = ${fightId}`).limit(1);
  return result[0] || null;
}
