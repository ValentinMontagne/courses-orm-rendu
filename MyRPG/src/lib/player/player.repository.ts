import { db } from "../../infrastructure/db";
import { players } from "../../infrastructure/db/schema";
import { CreatePlayer } from "./player.model";

export function createPlayerInRepository(data: CreatePlayer) {
    return db.insert(players).values(data).returning();
}

export async function getPlayersInRepository() {
    return await  db.select().from(players);
}