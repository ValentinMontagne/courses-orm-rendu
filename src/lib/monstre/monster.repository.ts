import { db } from "../../infrastructure/db";
import { monsters } from "../../infrastructure/db/schema";
import { CreateMonster } from "./monster.model";

export function createMonsterInRepository(data: CreateMonster) {
    return db.insert(monsters).values(data).returning();
};

export function getMonstersInRepository() {
    return db.select().from(monsters);
}