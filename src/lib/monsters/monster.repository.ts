import { sql } from "drizzle-orm";
import { db } from "../../infrastructure/db";
import { monsters } from "../../infrastructure/db/schema";
import { CreateMonster } from "./monster.model";

 
export function createMonsterInRepository(data: CreateMonster) {
  return db.insert(monsters).values(data).returning();
}

export async function getAllMonstersInRepository() {
    const result = await db.select().from(monsters);
    return result;
  }

export async function getMonsterByIdFromRepository(monsterId: string) {
  const result = await db.select().from(monsters).where(sql`${monsters.id} = ${monsterId}`).limit(1);
  return result[0] || null;
}