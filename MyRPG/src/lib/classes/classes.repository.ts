
import { eq } from "drizzle-orm";
import { db } from "../../infrastructure";
import { classes } from "../../infrastructure/db/schema";
import { CreateClasse } from "./classes.model";
 
export function createClasseInRepository(data: CreateClasse) {
  return db.insert(classes).values(data).returning();
}

export async function getAllClassesInRepository() {
  const result = await db.select().from(classes);
  return result;
}

export async function deleteClassesInRepository(id: number) {
    const result = await db.delete(classes).where(eq(classes.id, id)).returning();
    return result;
}