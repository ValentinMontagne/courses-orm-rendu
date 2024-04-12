import { eq, sql } from "drizzle-orm";
import { db } from "../../infrastructure/db";
import { Characters, Classes, players } from "../../infrastructure/db/schema";
import { CreateCharacter } from "./character.model";

export function createCharacterInRepository(data: CreateCharacter) {
  return db.insert(Characters).values(data).returning();
}

export function getClassInRepository(id: number) {
  return db
    .select()
    .from(Characters)
    .where(sql`${Characters.id} = ${id}`)
    .innerJoin(Classes, eq(Characters.classId, Classes.id))
    .innerJoin(players, eq(Characters.playerId, players.id));
}
