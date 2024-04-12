import { eq } from "drizzle-orm";
import { db } from "../../infrastructure/db";
import { fights, classes, players, characters, monsters } from "../../infrastructure/db/schema";
import { Fight, CreateFight } from "./fight.model";

export function createFightInRepository(data: CreateFight) {
  return db.insert(fights).values(data).returning();
}

export function findAll(this: any) {
    return db.select({
      id: fights.id,
      playerId: players,
      characterIds : fights.characterIds,
      monsterIds : fights.monsterIds,
      currentTurn : fights.currentTurn,
      turn : fights.turn,
      charactersHP : fights.charactersHP,
      monstersHP : fights.monstersHP,
      playerActions : fights.playerActions,
      monsterActions  : fights.monsterActions,
      status  : fights.status,

    }).from(fights).leftJoin(players, eq(players.id, fights.playerId))//.leftJoin(characters, eq(characters.id, fights.characterIds)).leftJoin(monsters, eq(monsters.id, fights.monsterIds))
  }

export function findById(id: number){
    return db.select().from(fights).where(eq(fights.id, id));
}

export function updateFightById(id: number, data: Partial<Fight>){
    return db.update(fights).set(data).where(eq(fights.id, id)).returning();
}

export function deleteFightById(id: number){
    return db.delete(fights).where(eq(fights.id, id)).execute();
}