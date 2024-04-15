import { eq } from "drizzle-orm";
import { db } from "../../infrastructure/db";
import { characters, classes, players } from "../../infrastructure/db/schema";
import { Character, CreateCharacter } from "./character.model";

export function createCharacterInRepository(data: CreateCharacter) {
  return db.insert(characters).values(data).returning();
}

export function findAll(this: any) {
    return db.select({
      id: characters.id,
      name: characters.name,
      xp : characters.xp,
      player : players,
      class : classes
    }).from(characters).leftJoin(classes, eq(characters.classId, classes.id)).leftJoin(players, eq(players.id, characters.playerId))
  }

export function findById(id: number){
  return db.select({
    id: characters.id,
    name: characters.name,
    xp : characters.xp,
    player : players,
    class : classes
  }).from(characters).leftJoin(classes, eq(characters.classId, classes.id)).leftJoin(players, eq(players.id, characters.playerId)).where(eq(characters.id, id));
}

export function updateCharacterById(id: number, data: Partial<Character>){
    return db.update(characters).set(data).where(eq(characters.id, id)).returning();
}

export function deleteCharacterById(id: number){
    return db.delete(characters).where(eq(characters.id, id)).execute();
}