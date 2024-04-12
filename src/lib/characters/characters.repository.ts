import {db} from "../../infrastructure/db";
import {characters, classes, players} from "../../infrastructure/db/schema";
import {eq} from "drizzle-orm";
import {CreateCharacter, UpdateCharacter} from "./characters.model";

export function getAllCharacterInRepository() {
    return db.select(
        {
            id: characters.id,
            name: characters.name,
            xp : characters.xp,
            player : players,
            class : classes
        }
    ).from(characters).leftJoin(players, eq(players.id, characters.playerId)).leftJoin(classes, eq(classes.id, characters.classId));
}

export function getCharacterByIdInRepository(id: number) {
    return db.select({
        id: characters.id,
        name: characters.name,
        xp : characters.xp,
        player : players,
        class : classes
    }).from(characters).where(eq(characters.id, id)).leftJoin(players, eq(players.id, characters.playerId)).leftJoin(classes, eq(classes.id, characters.classId));
}

export function createCharacterInRepository(data: CreateCharacter) {
    return db.insert(characters).values(data).returning();
}

export function updateCharacterByIdInRepository(id: number, data: UpdateCharacter){
    return db.update(characters).set(data).where(eq(characters.id, id)).returning();
}

export function deleteCharacterByIdInteRepository(id : number){
    return db.delete(characters).where(eq(characters.id, id)).returning();
}

