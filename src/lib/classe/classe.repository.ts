import { db } from "../../infrastructure/db";
import {eq} from "drizzle-orm";
import {CreateClasse} from "./classe.model";
import {classes} from "../../infrastructure/db/schema";

export function createClasseInRepository(data: CreateClasse) {
    return db.insert(classes).values(data).returning();
}

export function findAllInClasseRepository() {
    return db.select().from(classes)
}

export function findIdInClasseRepository(id: number) {
    return db.select().from(classes).where(eq(classes.id,id))
}

export function deleteClasseRepository(id: number) {
    return db.delete(classes).where(eq(classes.id,id)).returning()
}
