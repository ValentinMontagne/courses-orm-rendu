import { db } from "../../infrastructure/db";
import { fighters } from "../../infrastructure/db/schema";
import { CreateFighter } from "./fighter.model";

export function createFighterInRepository(data: CreateFighter) {
    return db.insert(fighters).values(data).returning();
}