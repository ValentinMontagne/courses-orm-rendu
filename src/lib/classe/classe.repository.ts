import { db } from "../../infrastructure/db";
import { classes } from "../../infrastructure/db/schema";
import { CreateClasse } from "./classe.model";

export function createClasseInRepository(data: CreateClasse) {
    return db.insert(classes).values(data).returning();
};

export function getClassesInRepository() {
    return db.select().from(classes);
}