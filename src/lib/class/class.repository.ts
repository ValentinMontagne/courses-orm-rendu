import { db } from "../../infrastructure/db";
import { Classes } from "../../infrastructure/db/schema";
import { CreateClass } from "./class.model";
import { sql } from "drizzle-orm";

export function createClassInRepository(data: CreateClass) {
  return db.insert(Classes).values(data).returning();
}
export function getClassInRepository(id: number) {
  return db
    .select()
    .from(Classes)
    .where(sql`${Classes.id} = ${id}`);
}
