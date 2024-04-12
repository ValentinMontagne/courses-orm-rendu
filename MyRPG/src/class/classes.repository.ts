import { db } from "../infrastructure/db/";
import { characters } from "../infrastructure/db/schema";
import { CreateClassesSchema } from "./classes.model";

export function createClassesInRepository(data: CreateClassesSchema) {
  return db.insert(characters).values(data).returning();
}