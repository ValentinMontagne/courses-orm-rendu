import { eq } from "drizzle-orm";
import { db } from "../../infrastructure/db";
import { characters, classes } from "../../infrastructure/db/schema";
import { CreateCharacter } from "./character.model";

export function createCharacterInRepository(data: CreateCharacter) {
  return db.insert(characters).values(data).returning();
}

export function getCharactereByIdInRepository(id:String){
  return db.select().from(characters).rightJoin(classes, eq(characters.classId, classes.id))
}

export async function getCharactersWithClassesinRepository() {
  const results = await db
    .select({charactersId: characters.id, charactersName: characters.name, charactersXp: characters.xp, classesName: classes.name})
    .from(characters)
    .innerJoin(classes, eq(characters.classId,classes.id));

  return results;
}