import { eq } from "drizzle-orm";
import { db } from "../../infrastructure/db";
import { classes } from "../../infrastructure/db/schema";
import { Classe, CreateClasse } from "./classe.model";

export function createClasseInRepository(data: CreateClasse) {
  return db.insert(classes).values(data).returning();
}

export function findAll(this: any): Promise<Classe[]> {
    return db.select().from(classes);
  }

export function findById(id: number){
    return db.select().from(classes).where(eq(classes.id, id));
}

export function updateClasseById(id: number, data: Partial<Classe>){
    return db.update(classes).set(data).where(eq(classes.id, id)).returning();
}

export function deleteClasseById(id: number){
    return db.delete(classes).where(eq(classes.id, id)).execute();
}