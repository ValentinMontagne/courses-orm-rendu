import { eq } from "drizzle-orm";
import { db } from "../../infrastructure/db";
import { characters } from "../../infrastructure/db/schema";
import { CreateCharacter } from "./characters.model";

export function createCharactersInRepository(data: CreateCharacter) {
  return db.insert(characters).values(data).returning();
}

export function deleteCharactersInRepository(id: string) {
  return db.delete(characters).where(eq(characters.id, parseInt(id))).returning();
}

export function getCharactersInRepository() {
  return db.select().from(characters);
}

export function updateCharactersInRepository(id: string) {
  return db.update(characters)
  .set({ name: 'Cavalier' })
  .where(eq(characters.id, parseInt(id))).returning();
}