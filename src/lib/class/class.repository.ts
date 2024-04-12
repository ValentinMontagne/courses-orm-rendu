import { eq } from "drizzle-orm";
import { db } from "../../infrastructure/db";
import { classes } from "../../infrastructure/db/schema";
import { Class, CreateClass } from "./class.model";

export function createClassInRepository(data: CreateClass) {
  return db.insert(classes).values(data).returning();
}

export function getAllClassesInRepository(): Promise<Class[]> {
  return db.select().from(classes);
}

export function getClassInRepository(classId: number): Promise<Class[]> {
  return db.select().from(classes).where(eq(classes.id , classId));
}

export function updateClassInRepository(classId: number, updatedClass: Partial<Class>): Promise<{ id: number }> {
  return db.update(classes)
    .set(updatedClass)
    .where(eq(classes.id, classId))
    .returning({ id: classes.id })
    .then(result => result[0]);
}

export function deleteClassInRepository(classId: number) {
  return db.delete(classes).where(eq(classes.id, classId));
}
