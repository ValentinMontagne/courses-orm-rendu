import { eq, sql } from "drizzle-orm";
import { db } from "../../infrastructure/db";
import { characters } from "../../infrastructure/db/schema";
import { CreateCharacter } from "./character.model";

 
export function createCharacterInRepository(data: CreateCharacter) {
  return db.insert(characters).values(data).returning();
}

export async function getAllCharactersFromRepository() {
  const result = await db.select().from(characters);
  return result;
}

export async function getCharacterByIdFromRepository(characterId: string) {
  const result = await db.select().from(characters).where(sql`${characters.id} = ${characterId}`).limit(1);
  return result[0] || null;
}

export async function UpdateCharacterInRepository(id: number) {
  const result = await db.update(characters).set({ name: 'Syoma' }).where(eq(characters.id, id)).returning();
  return result;
}

export async function deleteCharacterFromRepository(characterId: string) {
  const result = await db.delete(characters).where(sql`${characters.id} = ${characterId}`);
  return result
}