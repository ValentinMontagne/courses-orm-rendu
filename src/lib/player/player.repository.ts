import { eq } from "drizzle-orm";
import { db } from "../../infrastructure/db";
import { players } from "../../infrastructure/db/schema";
import { CreatePlayer, Player } from "./player.model";

export function createPlayerInRepository(data: CreatePlayer) {
  return db.insert(players).values(data).returning();
}

export function getAllPlayersInRepository(): Promise<Player[]> {
  return db.select().from(players);
}

export function getPlayerInRepository(playerId: number): Promise<Player[]> {
  return db.select().from(players).where(eq(players.id , playerId));
}

export function updatePlayerInRepository(playerId: number, updatedPlayer: Partial<Player>): Promise<{ id: number }> {
  return db.update(players)
    .set(updatedPlayer)
    .where(eq(players.id, playerId))
    .returning({ id: players.id })
    .then(result => result[0]);
}

export function deletePlayerInRepository(playerId: number) {
  return db.delete(players).where(eq(players.id, playerId));
}