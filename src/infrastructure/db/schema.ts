import { text, pgTable, serial, integer } from "drizzle-orm/pg-core";

// Classe Player
export const players = pgTable("players", {
  id: serial("id").primaryKey(),
  email: text("email").notNull(),
  name: text("name").notNull(),
});

// Classe Charactere
export const characters = pgTable("charactere",{
  id: serial("id").primaryKey(),
  name: text("name").notNull(),
  xp: integer("expérience").notNull(),
  classid:integer("classid").notNull(),
  playerid:integer("playerid").notNull()
});

// Class 
// Class

