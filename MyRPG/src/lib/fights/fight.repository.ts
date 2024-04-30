import { db } from "../../infrastructure/db";
import { fights } from "../../infrastructure/db/schema";
import { CreateFight } from "./fight.model";

export function createFightInRepository(data: CreateFight) {
    return db.insert(fights).values(data).returning();
}