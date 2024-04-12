import { eq } from "drizzle-orm";
import { db } from "../../infrastructure/db";
import { monsters } from "../../infrastructure/db/schema";
import { CreateMonster, Monster } from "./monster.model";

export function createMonsterInRepository(data: CreateMonster) {
  return db.insert(monsters).values(data).returning();
}

export function getAllMonstersInRepository(): Promise<Monster[]> {
  return db.select().from(monsters);
}

export function getMonsterInRepository(monsterId: number): Promise<Monster[]> {
  return db.select().from(monsters).where(eq(monsters.id , monsterId));
}

export function updateMonsterInRepository(monsterId: number, updatedMonster: Partial<Monster>): Promise<{ id: number }> {
  return db.update(monsters)
    .set(updatedMonster)
    .where(eq(monsters.id, monsterId))
    .returning({ id: monsters.id })
    .then(result => result[0]);
}

export function deleteMonsterInRepository(monsterId: number) {
  return db.delete(monsters).where(eq(monsters.id, monsterId));
}
