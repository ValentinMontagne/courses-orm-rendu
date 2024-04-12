import { db } from "../../infrastructure/db";
import { classes } from "../../infrastructure/db/schema";
import { CreateClasse, Classe } from "./classe.model";
import { eq } from "drizzle-orm";

export function createClasseInRepository(data: CreateClasse) {
  return db.insert(classes).values(data).returning();
}

export function getAllClassesFromRepository(): Promise<Classe[]> {
  return db.select().from(classes);
}

export function getClasseByIdFromRepository(
  idClasse: number
): Promise<Classe[] | null> {
  return db.select().from(classes).where(eq(classes.id, idClasse));
}

export function deleteClasseFromRepository(idClasse: number) {
  return db.delete(classes).where(eq(classes.id, idClasse));
}

export function updateClasseInRepository(
  classeId: number,
  updatedClasse: Partial<Classe>
): Promise<{ id: number }> {
  return db
    .update(classes)
    .set(updatedClasse)
    .where(eq(classes.id, classeId))
    .returning({ id: classes.id })
    .then((result) => result[0]);
}