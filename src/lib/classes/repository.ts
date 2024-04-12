import { db } from "../../infrastructure/db";
import { classes } from "../../infrastructure/db/schema";
import { CreateClasse } from "./model";

export function createClasseInRepository(data: CreateClasse) {
  return db.insert(classes).values(data).returning();
}
