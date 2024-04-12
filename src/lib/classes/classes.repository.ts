import {db} from "../../infrastructure/db";
import {classes} from "../../infrastructure/db/schema";
import {eq} from "drizzle-orm";
import {CreateClasse, UpdateClasse} from "./classes.model";

export function getAllClasseInRepository() {
    return db.select().from(classes);
}

export function getClasseByIdInRepository(id: number) {
    return db.select().from(classes).where(eq(classes.id, id));
}

export function createClasseInRepository(data: CreateClasse) {
    return db.insert(classes).values(data).returning();
}

export function updateClasseByIdInRepository(id: number, data: UpdateClasse){
    return db.update(classes).set(data).where(eq(classes.id, id)).returning();
}

export function deleteClasseByIdInteRepository(id : number){
    return db.delete(classes).where(eq(classes.id, id)).returning();
}


