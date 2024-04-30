import { db } from "../../infrastructure/db";
import {characters, classes, players} from "../../infrastructure/db/schema";
import {CreateCharacter, PutCharacter} from "./character.model";
import {eq} from "drizzle-orm";

export function createCharacterInRepository(data: CreateCharacter) {
    return db.insert(characters).values(data).returning();
}

export function findAllInCharacterRepository() {
    return db.select().from(characters).innerJoin(classes,eq(characters.classId , classes.id))
}

export function findIdInCharacterRepository(id: number) {
    return db.select().from(characters).innerJoin(classes,eq(characters.classId , classes.id)).where(eq(characters.id,id))
}

export function putCharacterRepository(data: PutCharacter, id:number) {
    return db.update(characters).set(data).where(eq(characters.id,id)).returning()
}

