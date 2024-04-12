import { eq, sql } from "drizzle-orm";
import { db } from "../../infrastructure/db";
import { players } from "../../infrastructure/db/schema";
import { CreatePlayer } from "./player.model";

export function createPlayerInRepository(data: CreatePlayer) {
  return db.insert(players).values(data).returning();
}

export function getPlayersInRepository(){
    return db.select().from(players).execute();
}


export function deletePlayerInRepository(id : number){
    return db.delete(players).where(eq(players.id,id)).returning({id:players.id,name:players.name,email:players.email}).execute();
}