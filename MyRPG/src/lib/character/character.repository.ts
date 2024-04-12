import { db } from "../../infrastructure/db";
import { players } from "../../infrastructure/db/schema";
import { CreateCharacter } from './character.model';
 
export function createCharacterInRepository(data: CreateCharacter) {
  return db.insert(players).values(data).returning();
}