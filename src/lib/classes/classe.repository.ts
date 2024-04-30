	
import { db } from "../../infrastructure/db";
import { classes } from "../../infrastructure/db/schema";
import { CreateClasse } from "./classe.model";
import { sql } from "drizzle-orm";
 
export function createClasseInRepository(data: CreateClasse) {
  return db.insert(classes).values(data).returning();
}

export async function getAllClassesFromRepository() {
    const result = await db.select().from(classes);
    return result;
  }
  
  export async function getClassesByIdFromRepository(classeId: string) {
    const result = await db.select().from(classes).where(sql`${classes.id} = ${classeId}`).limit(1);
    return result[0] || null;
  }