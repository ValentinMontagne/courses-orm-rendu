import { eq } from "drizzle-orm";
import { db } from "../../infrastructure/db";
import { players } from "../../infrastructure/db/schema";
import { CreatePlayer, Player } from "./player.model";

export function createPlayerInRepository(data: CreatePlayer) {
  return db.insert(players).values(data).returning();
}

export function findAll(this: any): Promise<Player[]> {
    return db.select().from(players);
  }

export function findById(id: number){
    return db.select().from(players).where(eq(players.id, id));
}

export function updatePlayerById(id: number, data: Partial<Player>){
    return db.update(players).set(data).where(eq(players.id, id)).returning();
}

export function deletePlayerById(id: number){
    return db.delete(players).where(eq(players.id, id)).execute();
}