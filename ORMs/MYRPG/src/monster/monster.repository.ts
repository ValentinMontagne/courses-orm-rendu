import { db } from "../infrastructure/db";
import { monster } from "../infrastructure/db/schema";
import { CreateMonster } from "./monster.model";

export function createMonsterInRepository(data: CreateMonster) {
  return db.insert(monster).values(data).returning();
}
