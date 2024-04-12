import { text, pgTable, serial, integer } from "drizzle-orm/pg-core";

export const players = pgTable("players", {
  id: serial("id").primaryKey(),
  email: text("email").notNull(),
  name: text("name").notNull(),
});

export const characters = pgTable("characters", {
  id: serial("id").primaryKey(),
  xp: integer("xp").notNull(),
  name: text("name").notNull(),
  playerId: integer("player_id").references(() => players.id).notNull(),
  classId: integer("class_id").references(() => classes.id).notNull(),
});

export const classes = pgTable("classes", {
  id: serial("id").primaryKey(),
  power: integer("power").notNull(),
  name: text("name").notNull(),
  hp : integer("hp").notNull(),
});

export const monster = pgTable("classes", {
  id: serial("id").primaryKey(),
  power: integer("power").notNull(),
  name: text("name").notNull(),
  hp : integer("hp").notNull(),
});