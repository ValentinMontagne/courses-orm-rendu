import { text, pgTable, serial, integer, pgEnum } from "drizzle-orm/pg-core";

export const players = pgTable("players", {
  id: serial("id").primaryKey(),
  email: text("email").notNull(),
  name: text("name").notNull(),
});


export const characters = pgTable("character", {
  id: serial("id").primaryKey(),
  name: text("name"),
  xp: text("xp"),
  classId: integer("classes_id").notNull().references(() => classes.id, { onDelete: "cascade" }),
  playerId: integer("player_id").notNull().references(() => players.id, { onDelete: "cascade" }),
});


export const classes = pgTable("class", {
  id: serial("id").primaryKey(),
  name: text("name"),
  power: integer("power").notNull(),
  hp: integer("hp").notNull(),
});

export const monsters = pgTable("monsters", {
  id: serial("id").primaryKey(),       
  name: text("name").notNull(),         
  power: integer("power").notNull(),    
  hp: integer("hp").notNull(),          
});


