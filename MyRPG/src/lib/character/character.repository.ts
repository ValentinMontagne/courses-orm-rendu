import { eq, sql } from "drizzle-orm";
import { db } from "../../infrastructure/db";
import { characters, classes, players } from "../../infrastructure/db/schema";
import { CreateCharacter } from "./character.model";
import { char } from "drizzle-orm/mysql-core";

export function createCharacterInRepository(data: CreateCharacter) {
  return db.insert(characters).values(data).returning();
}

export function getCharacterInRepository(){
    return db.select().from(characters).execute();
}

export function deleteCharacterInRepository(id : number){
    return db.delete(characters).where(eq(characters.id,id)).returning({id:characters.id,name:characters.name,classId:characters.classId,playerId:characters.playerId}).execute();
}

export function getCharacterByIdInRepository(id : number){
  return db.select().from(characters).where(eq(characters.id,id)).execute();
}

