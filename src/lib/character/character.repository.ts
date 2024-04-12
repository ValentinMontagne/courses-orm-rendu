import { db } from "../../infrastructure/db";
import { characters } from "../../infrastructure/db/schema";
import { eq } from 'drizzle-orm';
import { CreateCharacter, Character } from "./character.model";

export function createCharacterInRepository(data: CreateCharacter) {
  return db.insert(characters).values(data).returning();
}

export function getAllCharactersInRepository(): Promise<Character[]> {
  return db.select().from(characters);
}

export function getCharacterInRepository(characterId: number): Promise<Character[]> {
  return db.select().from(characters).where(eq(characters.id , characterId));
}

export function updateCharacterInRepository(characterId: number, updatedCharacter: Partial<Character>): Promise<{ id: number }> {
  return db.update(characters)
    .set(updatedCharacter)
    .where(eq(characters.id, characterId))
    .returning({ id: characters.id })
    .then(result => result[0]);
}

export function deleteCharacterInRepository(characterId: number) {
  return db.delete(characters).where(eq(characters.id, characterId));
}
