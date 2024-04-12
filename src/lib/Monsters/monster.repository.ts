import {db} from "../../infrastructure/db";
import {monsters} from "../../infrastructure/db/schema";
import {eq} from "drizzle-orm";
import {CreateMonster, UpdateMonster} from "./monsters.model";

export function getAllMonsterInRepository() {
    return db.select().from(monsters);
}

export function getMonsterByIdInRepository(id: number) {
    return db.select().from(monsters).where(eq(monsters.id, id));
}

export function createMonsterInRepository(data: CreateMonster) {
    return db.insert(monsters).values(data).returning();
}

export function updateMonsterByIdInRepository(id: number, data: UpdateMonster){
    return db.update(monsters).set(data).where(eq(monsters.id, id)).returning();
}

export function deleteMonsterByIdInteRepository(id : number){
    return db.delete(monsters).where(eq(monsters.id, id)).returning();
}


