
import { eq } from "drizzle-orm";
import { db } from "../../infrastructure";
import { players } from "../../infrastructure/db/schema";
import { CreatePlayer } from "./player.model";
 
export function createPlayerInRepository(data: CreatePlayer) {
  return db.insert(players).values(data).returning();
}
export async function getAllPlayersInRepository() {
    const result = await db.select().from(players);
    return result;
  }

export async function getPlayerByIdInRepository(id: number) {
    const result = await db.select().from(players).where(eq(players.id, id));
    return result;
}

export async function UpdatePlayerInRepository(id: number) {
    const result = await db.update(players).set({ name: 'Mr. Dan' }).where(eq(players.id, id)).returning();
    return result;
}