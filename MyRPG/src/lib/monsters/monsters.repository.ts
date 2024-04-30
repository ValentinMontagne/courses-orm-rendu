
import { db } from "../../infrastructure";
import { monsters } from "../../infrastructure/db/schema";
import { CreateMonster } from "./monsters.model";
 
export function createMonsterInRepository(data: CreateMonster) {
  return db.insert(monsters).values(data).returning();
}

export async function getAllMonstersInRepository() {
    const result = await db.select().from(monsters);
    return result;
  }