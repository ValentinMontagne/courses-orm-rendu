import {db} from "../../infrastructure/db";
import {monsters, players} from "../../infrastructure/db/schema";
import {CreateMonster, Monster} from "./monster.model";
import {CreatePlayer, Player} from "../player/player.model";
import {eq} from "drizzle-orm";


export function createMonsterInRepository(data: CreateMonster) {
    return db.insert(monsters).values(data).returning();
}

export async function getMonsterByIdFromRepository(monsterId: number): Promise<Monster | null> {
    try {
        const result = await db.select().from(monsters).where(eq(monsters.id, monsterId));
        if (result.length === 0) {
            return null;
        }
        return {
            id: result[0].id,
            name: result[0].name,
            power: result[0].power,
            hp: result[0].hp,
        };
    } catch (error) {
        console.error("Error retrieving monster from repository:", error);
        throw error;
    }
}

export function deleteMonsterByIdFromRepository(monsterId: number) {
    return db.delete(monsters).where(eq(monsters.id, monsterId)).returning();
}

export function updateMonsterByIdFromRepository(monsterId: number, data: CreateMonster) {
    return db.update(monsters).set(data).where(eq(monsters.id, monsterId)).returning();
}