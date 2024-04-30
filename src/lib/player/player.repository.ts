import { db } from "../../infrastructure/db";
import {classes, players} from "../../infrastructure/db/schema";
import { CreatePlayer } from "./player.model";
import {eq} from "drizzle-orm";

export function createPlayerInRepository(data: CreatePlayer) {
    return db.insert(players).values(data).returning();
}

export function findAllInPlayerRepository() {
    return db.select().from(players)
}

export function findIdInPlayerRepository(id: number) {
    return db.select().from(players).where(eq(players.id,id))
}
