import { eq, sql } from "drizzle-orm";
import { db } from "../../infrastructure/db";
import { classes, players } from "../../infrastructure/db/schema";
import { CreateClasse } from "./classe.model";

export function createClasseInRepository(data: CreateClasse) {
  return db.insert(classes).values(data).returning();
}

export function getClassesInRepository(){
    return db.select().from(classes).execute();
}

export function getClassesByIdInRepository(id : number){
  return db.select().from(classes).where(eq(classes.id,id)).execute();
}


export function deleteClasseInRepository(id : number){
    return db.delete(classes).where(eq(classes.id,id)).returning({id:classes.id,name:classes.name,power:classes.power,hp:classes.hp}).execute();
}