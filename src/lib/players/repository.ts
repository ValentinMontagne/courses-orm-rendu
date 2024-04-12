import { db } from "../../infrastructure/db";
import { players } from "../../infrastructure/db/schema";
import { CreatePlayer } from "../players/model";

export function createPlayerInRepository(data: CreatePlayer) {
  return db.insert(players).values(data).returning();
}
