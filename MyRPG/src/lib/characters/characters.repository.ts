
import { db } from "../../infrastructure";
import { characters } from "../../infrastructure/db/schema";
import { CreateCharacter } from "./characters.model";
 
export function createCharacterInRepository(data: CreateCharacter) {
  return db.insert(characters).values(data).returning();
}

export async function getAllCharactersInRepository() {
    const result = await db.select().from(characters);
    return result;
  }