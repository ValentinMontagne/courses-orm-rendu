import { sql } from "drizzle-orm";
import { db } from "../../infrastructure/db";
import { players } from "../../infrastructure/db/schema";
import { CreatePlayer } from "./player.model";
 
export function createPlayerInRepository(data: CreatePlayer) {
  return db.insert(players).values(data).returning();
}

export async function getAllPlayersFromRepository() {
    const result = await db.select().from(players);
    return result;
  }

  export async function getPlayerByIdFromRepository(playerId: string) {
    const result = await db.select().from(players).where(sql`${players.id} = ${playerId}`).limit(1);
    return result[0] || null;
  }