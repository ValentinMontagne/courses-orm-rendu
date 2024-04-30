import { sql } from "drizzle-orm";
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

export async function updateCharacterInRepository(characterId: string, newData: Partial<CreateCharacter>) {
  return db.update(characters).set(newData).where(sql`${characters.id} = ${characterId}`).returning();
}

export async function deleteCharacterFromRepository(characterId: string) {
  return db.delete(characters).where(sql`${characters.id} = ${characterId}`);
}