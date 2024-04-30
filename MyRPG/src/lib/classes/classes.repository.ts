import { eq } from "drizzle-orm";
import { db } from "../../infrastructure/db";
import { classes } from "../../infrastructure/db/schema";
import { CreateClasse } from "./classes.model";

export function createClasseInRepository(data: CreateClasse) {
  return db.insert(classes).values(data).returning();
}

export function GetByIdClasseInRepository(id: string) {
    return db.select().from(classes).where(eq(classes.id, parseInt(id)));
  }