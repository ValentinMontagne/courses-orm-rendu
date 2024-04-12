import {db} from "../../infrastructure/db";
import {characters, classes} from "../../infrastructure/db/schema";
import {Character, CharacterWithClass, CreateCharacter} from "./character.model";
import {Column, eq, sql} from "drizzle-orm";

function lower(col: Column) {
    return sql<string>`lower(${col})`;
}

export function createCharacterInRepository(data: CreateCharacter) {
    return db.insert(characters).values(data).returning();
}

export async function getCharacterByIdFromRepository(characterId: number): Promise<CharacterWithClass | null> {
    try {
        const result = await db.select().from(characters).where(eq(characters.id, characterId)).innerJoin(classes, eq(characters.classId, classes.id));
        if (result.length === 0) {
            return null;
        }
        return {
            id: result[0].characters.id,
            name: result[0].characters.name,
            xp: result[0].characters.xp,
            playerId: result[0].characters.playerId,
            classId: result[0].characters.classId,
            level: result[0].characters.level,
            class: {
                id: result[0].classes.id,
                name: result[0].classes.name,
                power: result[0].classes.power,
                hp: result[0].classes.hp,
            },
        };
    } catch (error) {
        console.error("Error retrieving character from repository:", error);
        throw error;
    }
}

export function deleteCharacterByIdFromRepository(characterId: number) {
    return db.delete(characters).where(eq(characters.id, characterId)).returning();
}

export function updateCharacterByIdFromRepository(characterId: number, data: CreateCharacter) {
    return db.update(characters).set(data).where(eq(characters.id, characterId)).returning();
}