import { eq } from "drizzle-orm";
import { db } from "../../infrastructure/db";
import { monsters } from "../../infrastructure/db/schema";
import { CreateMonster } from "./monster.model";

export function createMonsterInRepository(data: CreateMonster) {
  return db.insert(monsters).values(data).returning();
}

export function getMonstersInRepository(){
    return db.select().from(monsters).execute();
}

export function getMonsterByIdInRepository(id : number){
    return db.select().from(monsters).where(eq(monsters.id,id)).execute();
}


export function deleteMonsterInRepository(id : number){
    return db.delete(monsters).where(eq(monsters.id,id)).returning({id:monsters.id,name:monsters.name,power:monsters.power, hp : monsters.hp}).execute();
}