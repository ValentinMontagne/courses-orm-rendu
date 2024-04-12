import { db } from "../../infrastructure/db";
import {players} from "../../infrastructure/db/schema";
import {CreatePlayer, Player} from "./player.model";
import {eq} from "drizzle-orm";


export function createPlayerInRepository(data: CreatePlayer) {
    return db.insert(players).values(data).returning();
}

export async function getPlayerByIdFromRepository(characterId: number): Promise<Player | null> {
    try {
        const result = await db.select().from(players).where(eq(players.id, characterId));
        if (result.length === 0) {
            return null;
        }
        return {
            id: result[0].id,
            name: result[0].name,
            email: result[0].email,
        };
    } catch (error) {
        console.error("Error retrieving character from repository:", error);
        throw error;
    }
}

export function updatePlayerByIdFromRepository(playerId: number, data: CreatePlayer) {
    return db.update(players).set(data).where(eq(players.id, playerId)).returning();
}

export function deletePlayerByIdFromRepository(playerId: number) {
    return db.delete(players).where(eq(players.id, playerId)).returning();
}