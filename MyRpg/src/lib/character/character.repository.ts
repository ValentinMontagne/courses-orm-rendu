import { eq } from "drizzle-orm";
import { db } from "../../infrastructure/db";
import { characters } from "../../infrastructure/db/schema";
import { Character, CreateCharacter } from "./character.model";

export function createCharacterInRepository(data: CreateCharacter) {
  return db.insert(characters).values(data).returning();
}

export function findAll(this: any): Promise<Character[]> {
    return db.select().from(characters);
  }

export function findById(id: number){
    return db.select().from(characters).where(eq(characters.id, id));
}

export function updateCharacterById(id: number, data: Partial<Character>){
    return db.update(characters).set(data).where(eq(characters.id, id)).returning();
}

export function deleteCharacterById(id: number){
    return db.delete(characters).where(eq(characters.id, id)).execute();
}