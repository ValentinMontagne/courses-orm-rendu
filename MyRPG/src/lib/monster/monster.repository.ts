import { db } from "../../infrastructure/db";
import { monsters } from "../../infrastructure/db/schema";
import { CreateMonster, Monster } from "./monster.model";
import { eq } from "drizzle-orm";


export function createMonsterInRepository(data: CreateMonster) {
  return db.insert(monsters).values(data).returning();
}

export function getAllMonstersFromRepository(): Promise<Monster[]> {
  return db.select().from(monsters);
}

export function getMonsterByIdFromRepository(
  idMonster: number
): Promise<Monster[] | null> {
  return db.select().from(monsters).where(eq(monsters.id, idMonster));
}

export function deleteMonsterFromRepository(idMonster: number) {
  return db.delete(monsters).where(eq(monsters.id, idMonster));
}

export function updateMonsterInRepository(
  monsterId: number,
  updatedMonster: Partial<Monster>
): Promise<{ id: number }> {
  return db
    .update(monsters)
    .set(updatedMonster)
    .where(eq(monsters.id, monsterId))
    .returning({ id: monsters.id })
    .then((result) => result[0]);
}