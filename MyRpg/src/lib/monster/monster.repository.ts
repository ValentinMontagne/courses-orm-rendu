import { eq } from "drizzle-orm";
import { db } from "../../infrastructure/db";
import { monsters, classes, players } from "../../infrastructure/db/schema";
import { Monster, CreateMonster } from "./monster.model";

export function createMonsterInRepository(data: CreateMonster) {
  return db.insert(monsters).values(data).returning();
}

export function findAll(this: any) {
    return db.select().from(monsters);
  }

export function findById(id: number){
    return db.select().from(monsters).where(eq(monsters.id, id));
}

export function updateMonsterById(id: number, data: Partial<Monster>){
    return db.update(monsters).set(data).where(eq(monsters.id, id)).returning();
}

export function deleteMonsterById(id: number){
    return db.delete(monsters).where(eq(monsters.id, id)).execute();
}