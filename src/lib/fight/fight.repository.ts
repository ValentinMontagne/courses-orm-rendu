import { db } from "../../infrastructure/db";
import {eq} from "drizzle-orm";
import {CreateFighDTO, CreateFight, CreateFightDtoSchema, PutFight, statusType} from "./fight.model";
import {fights} from "../../infrastructure/db/schema";
import {findIdPlayer} from "../player/player.service";
import {findIdCharacter} from "../characters/character.service";
import {findIdMonster} from "../monster/monster.service";

export function createFightInRepository(data: CreateFight) {
    return db.insert(fights).values(data).returning();
}

export function findAllInFightRepository() {
    return db.select().from(fights)
}

export function findIdInFightRepository(id: number) {
    return db.select().from(fights).where(eq(fights.id,id))
}

export function putFightRepository(data: PutFight, id:number) {
    return db.update(fights).set(data).where(eq(fights.id,id)).returning()
}

