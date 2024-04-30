import { text, pgTable, serial, numeric } from "drizzle-orm/pg-core";

export const players = pgTable("players", {
  id: serial("id").primaryKey(),
  email: text("email").notNull(),
  name: text("name").notNull(),
});

export const characters = pgTable("characters", {
  id: serial("id").primaryKey(),
  playerId: numeric("playerId").notNull(),
  classId: numeric("classId").notNull(),
  xp: numeric("xp").notNull(),
  name: text("name").notNull(),
});

export const classes = pgTable("classes", {
  id: serial("id").primaryKey(),
  name: text("name").notNull(),
  power: numeric("power").notNull(),
  hp: numeric("hp").notNull(),
});

export const monsters = pgTable("monsters", {
  id: serial("id").primaryKey(),
  name: text("name").notNull(),
  power: numeric("power").notNull(),
  hp: numeric("hp").notNull(),
})

export const fights = pgTable("fights", {
  id: serial("id").primaryKey(),
  playerId: numeric("playerId").notNull(),
  characterIds: numeric("characterIds").notNull(),
  monsterIds: numeric("monsterIds").notNull(),
  currentTurn : numeric("currentTurn ").notNull(),
  turn: numeric("turn").notNull(),
  charactersHP : numeric("charactersHP ").notNull(),
  monstersHP : numeric("monstersHP ").notNull(),
  playerActions : numeric("playerActions ").notNull(),
  monsterActions : numeric("monsterActions ").notNull(),
  status : numeric("status ").notNull(),
})