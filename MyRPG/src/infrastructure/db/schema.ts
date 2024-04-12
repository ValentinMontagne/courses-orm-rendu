import { text, pgTable, serial, integer, pgEnum } from "drizzle-orm/pg-core";

export const players = pgTable("players", {
  id: serial("id").primaryKey(),
  email: text("email").notNull(),
  name: text("name").notNull(),
});

export const characters = pgTable("characters", {
  id: serial("id").primaryKey(),
  name: text("name").notNull(),
  xp: integer("xp").notNull(),
  classId: integer("classId").notNull().references(() => classes.id),
  playerId: integer("playerId").notNull().references(() => players.id),
});

export const classes = pgTable("classes", {
  id: serial("id").primaryKey(),
  name: text("name").notNull(),
  hp: integer("hp").notNull(),
  power: integer("power").notNull(),
});

export const monsters = pgTable("monsters", {
  id: serial("id").primaryKey(),
  name: text("name").notNull(),
  power: integer("power").notNull(),
  hp: integer("hp").notNull(),
});

export const fights = pgTable("fights", {
  playerId: integer("playerId").notNull().references(() => players.id),
  characterIds: array("characterIds").notNull(),
  monsterIds: array("monsterIds").notNull(),
  currentTurn: pgEnum("currentTurn", ["PLAYER", "MONSTER"]).notNull(),
  turn: integer("turn").notNull().default(0),
  charactersHP: integer("charactersHP").notNull(),
  monstersHP: integer("monstersHP").notNull(),
  playerActions: array("playerActions").notNull(),
  monsterActions: array("monsterActions").notNull(),
  status: pgEnum("status", ["IN_PROGRESS", "PLAYER_WON", "MONSTERS_WON"]).notNull(),
});
