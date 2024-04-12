import {db} from "../../infrastructure/db";
import {characters, classes, fights, monsters} from "../../infrastructure/db/schema";
import {eq} from "drizzle-orm";
import {CreateFight, Fight, NoIdFight, UpdateFight} from "./fights.models";

export function getAllFightInRepository() {
    return db.select().from(fights);
}

export function getFightByIdInRepository(id: number) {
    return db.select().from(fights).where(eq(fights.id, id));
}

export function createFightInRepository(data: NoIdFight) {
     return db.insert(fights).values(data).returning();
}

export function updateFightByIdInRepository(id: number, data: UpdateFight){
    return db.update(fights).set(data).where(eq(fights.id, id)).returning();
}
export function updateFightAfterAttackByIdInRepository(id: number, data: Fight){
    return db.update(fights).set(data).where(eq(fights.id, id)).returning();
}

export function deleteFightByIdInteRepository(id : number){
    return db.delete(fights).where(eq(fights.id, id)).returning();
}


