import { integer, text, pgTable, serial } from "drizzle-orm/pg-core";

// joueurs
export const players = pgTable("players", {
  id: serial("id").primaryKey(),
  email: text("email").notNull(),
  name: text("name").notNull(),
});

// personnages
export const characters = pgTable("characters", {
  id: serial("id").primaryKey(),
  name: text("name").notNull(),
  xp: integer("xp").notNull().default(0), 
  classId: integer("class_id").notNull(), 
  playerId: integer("player_id").notNull(), 
});

// classes
export const classes = pgTable("classes", {
  id: serial("id").primaryKey(),
  name: text("name").notNull(),
  power: integer("power").notNull(),
  hp: integer("hp").notNull(), 
});



