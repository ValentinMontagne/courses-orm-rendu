import { db } from "../../infrastructure/db";
import {eq} from "drizzle-orm";
import {characters, monsters} from "../../infrastructure/db/schema";
import {CreateMonster, PutMonster} from "./monster.model";
import {PutCharacter} from "../characters/character.model";
import {m} from "@httpx/exception/dist/HttpClientException-6qDwRaH4";

export function createMonsterInRepository(data: CreateMonster) {
    return db.insert(monsters).values(data).returning();
}

export function findAllInMonsterRepository() {
    return db.select().from(monsters)
}

export function findIdInMonsterRepository(id: number) {
    return db.select().from(monsters).where(eq(monsters.id,id))
}

export function putMonsterRepository(data: PutMonster, id:number) {
    return db.update(monsters).set(data).where(eq(monsters.id,id)).returning()
}

export function deleteMonsterRepository(id:number) {
    return db.delete(monsters).where(eq(monsters.id,id)).returning()
}

