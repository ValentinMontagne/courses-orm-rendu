import { eq } from "drizzle-orm";
import { db } from "../../infrastructure/db";
import { characters } from "../../infrastructure/db/schema";
import { classes } from "../../infrastructure/db/schema";
import { CreateCharacter } from "./model";

export function createCharacterInRepository(data: CreateCharacter) {
  return db.insert(characters).values(data).returning();
}

// Fonction pour récupérer les personnages avec leurs classes associées
export function getCharactersWithClasses() {
  const result = db.select().from(characters).innerJoin(classes, eq(characters.classId, classes.id))
}