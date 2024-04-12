import { Character, CreateCharacter } from "./character.model";
import { characters, classes } from "../../infrastructure/db/schema";
import { db } from "../../infrastructure/db";
import { eq } from "drizzle-orm";
import { Classe } from "../classe/classe.model";

export function createCharacterInRepository(data: CreateCharacter) {
  return db.insert(characters).values(data).returning();
}

export function getAllCharactersFromRepository(): Promise<Character[]> {
  return db
    .select()
    .from(characters)
    .rightJoin(classes, eq(characters.classId, classes.id));
}

export function getCharacterByIdRepository(
  idCharacter: number
): Promise<Character[]> {
  return db.select().from(characters).where(eq(characters.id, idCharacter));
}

export function deleteCharacterInRepository(idCharacters: number) {
  return db.delete(characters).where(eq(characters.id, idCharacters));
}

export function updateCharacterInRepository(
  characterId: number,
  updatedCharacter: Partial<Character>
): Promise<{ id: number }> {
  return db
    .update(characters)
    .set(updatedCharacter)
    .where(eq(characters.id, characterId))
    .returning({ id: characters.id })
    .then((result) => result[0]);
}
