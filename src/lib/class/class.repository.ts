import { db } from "../../infrastructure/db";
import { classes } from "../../infrastructure/db/schema";
import { CreateClass } from "./class.model";

export function createClassInRepository(data: CreateClass) {
    return db.insert(classes).values(data).returning();
}