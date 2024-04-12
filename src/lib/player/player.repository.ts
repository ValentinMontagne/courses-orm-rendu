import { sql } from "drizzle-orm";
import { db } from "../../infrastructure/db";
import { players } from "../../infrastructure/db/schema";
import { CreatePlayer } from "./player.model";

export function createPlayerInRepository(data: CreatePlayer) {
  return db.insert(players).values(data).returning();
}

export function getClassInRepository(id: number) {
  return db
    .select()
    .from(players)
    .where(sql`${players.id} = ${id}`);
}
