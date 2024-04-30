import { eq } from "drizzle-orm";
import { db } from "../../infrastructure/db";
import { characters, classes } from "../../infrastructure/db/schema";
import { CreateCharacter } from "./character.model";

export function createCharacterInRepository(data: CreateCharacter) {
  return db.insert(characters).values(data).returning();
}
export function getCharacterAndClasse(id: number){
  return db.select({
    id: characters.id,
    playersid: characters.playerId,
    class: {
      id: classes.id,
      name: classes.name,
      power: classes.power,
      hp: classes.hp
    },
    xp: characters.xp,
    name: characters.name
  }).from(characters).innerJoin(classes, eq(characters.classId, classes.id));
}