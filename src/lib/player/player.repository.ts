import {db} from "../../infrastructure/db";
import {players} from "../../infrastructure/db/schema";
import {CreatePlayer, Player, UpdatePlayer} from "./player.model";
import {eq} from "drizzle-orm";

export function getAllPlayerInRepository() {
    return db.select().from(players);
}

export function getPlayerByIdInRepository(id: number) {
    return db.select().from(players).where(eq(players.id, id));
}

export function createPlayerInRepository(data: CreatePlayer) {
    return db.insert(players).values(data).returning();
}
export function updatePlayerByIdInRepository(id: number, data: UpdatePlayer){
    return db.update(players).set(data).where(eq(players.id, id)).returning();
}

export function deletePlayerByIdInteRepository(id : number){
    return db.delete(players).where(eq(players.id, id)).returning();
}
