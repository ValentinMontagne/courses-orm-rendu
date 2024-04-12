import {db} from "../../infrastructure/db";
import {monsters} from "../../infrastructure/db/schema";
import {CreateMonster} from "./monsters.model";

export function createMonsterInRepository(data: CreateMonster) {
    return db.insert(monsters).values(data).returning();
}