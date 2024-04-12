import { players } from "../../infrastructure/db/schema";
import { CreatePlayer, Player } from "./player.model";
import { db } from "../../infrastructure/db";
import { eq } from "drizzle-orm";

export function createPlayerInRepository(data: CreatePlayer) {
  return db.insert(players).values(data).returning();
}

export function getAllPlayersFromRepository(): Promise<Player[]> {
  return db.select().from(players);
}

export function getPlayerByIdFromRepository(
  idPlayer: number
): Promise<Player[] | null> {
  return db.select().from(players).where(eq(players.id, idPlayer));
}

export function deletePlayerFromRepository(idPlayer: number) {
  return db.delete(players).where(eq(players.id, idPlayer));
}

export function updatePlayerInRepository(
  playerId: number,
  updatedPlayer: Partial<Player>
): Promise<{ id: number }> {
  return db
    .update(players)
    .set(updatedPlayer)
    .where(eq(players.id, playerId))
    .returning({ id: players.id })
    .then((result) => result[0]);
}
