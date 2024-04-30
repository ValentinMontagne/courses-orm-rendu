import { db } from "../../infrastructure/db";
import { monsters } from "../../infrastructure/db/schema";
import { CreateMonster } from "./monsters.model";

export const createMonsterInRepository = (data: CreateMonster) => {
    return db.insert(monsters).values(data).returning();
}