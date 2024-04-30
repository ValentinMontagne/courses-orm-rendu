import { db } from "../../infrastructure/db";
import { classes } from "../../infrastructure/db/schema";
import { CreateClasses } from "./classes.model";

export function createClassesInRepository(data: CreateClasses) {
    return db.insert(classes).values(data).returning();
}

export function getClassesInRepository() {
    return db.select().from(classes).execute();
}