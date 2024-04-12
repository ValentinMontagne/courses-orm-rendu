import { eq } from "drizzle-orm";
import { db } from "../../infrastructure/db";
import { fights } from "../../infrastructure/db/schema";
import { CreateFight } from "./fight.model";

export function createFightInRepository(data: CreateFight) {
  return db.insert(fights).values(data).returning();
}

export function getFightsInRepository(){
    return db.select().from(fights).execute();
}


export function deleteFightInRepository(id : number){
    //return db.delete(Fights).where(eq(Fights.id,id)).returning({id:Fights.id,name:Fights.name,power:Fights.power, hp : Fights.hp}).execute();
}