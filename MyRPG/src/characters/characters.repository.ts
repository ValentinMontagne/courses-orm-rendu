import { db } from "../../src/infrastructure/db";
import { characters } from "../infrastructure/db/schema";
import { CreateCharactersSchema} from "./characters.model";

export function createCharactersInRepository(data: CreateCharactersSchema) {
  return db.insert(characters).values(data).returning();
}