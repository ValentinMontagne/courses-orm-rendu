import {db} from "../../infrastructure/db";
import {classes, players} from "../../infrastructure/db/schema";
import {Class, CreateClass} from "./class.model";
import {eq} from "drizzle-orm";


export function createClassInRepository(data: CreateClass) {
    return db.insert(classes).values(data).returning();
}

export async function getClassByIdFromRepository(classId: number): Promise<Class | null> {
    try {
        const result = await db.select().from(classes).where(eq(classes.id, classId));
        if (result.length === 0) {
            return null;
        }
        return {
            id: result[0].id,
            name: result[0].name,
            power: result[0].power,
            hp: result[0].hp,
        };
    } catch (error) {
        console.error("Error retrieving character from repository:", error);
        throw error;
    }
}

export function updateClassByIdFromRepository(classId: number, data: CreateClass) {
    return db.update(classes).set(data).where(eq(classes.id, classId)).returning();
}

export function deleteClassByIdFromRepository(classId: number) {
    return db.delete(classes).where(eq(classes.id, classId)).returning();
}