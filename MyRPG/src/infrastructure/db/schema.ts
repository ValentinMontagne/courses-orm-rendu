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
  classId: integer("classId").references(() => classes.id),
  playerId: integer("playerId").references(() => players.id)
});

export const classes = pgTable("classes", {
  id: serial("id").primaryKey(),
  name: text("name").notNull(),
  power: integer("power").notNull(),
  hp: integer("hp").notNull(),
});

export const monsters = pgTable("monsters", {
  id: serial("id").primaryKey(),
  name: text("name").notNull(),
  power: integer("power").notNull(),
  hp: integer("hp").notNull(),
});

