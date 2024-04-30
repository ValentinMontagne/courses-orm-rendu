import { sql } from "drizzle-orm";
import { text, pgTable, serial, integer, pgEnum } from "drizzle-orm/pg-core";

export const currentTurn = pgEnum("current_turn", ["PLAYER", "MONSTER"]);
export const status = pgEnum("action", ["PROGRESS", "PLAYER_WON", "MONSTERS_WON"]);

export const players = pgTable("players", {
  id: serial("id").primaryKey(),
  email: text("email").notNull(),
  name: text("name").notNull(),
});

export const characters = pgTable("characters", {
  id: serial("id").primaryKey(),
  xp: text("xp").notNull(),
  name: text("name").notNull(),
  classId: integer("class_id")
    .notNull()
    .references(() => classes.id),
  playerId: integer("player_id")
    .notNull()
    .references(() => players.id),
});

export const classes = pgTable("classes", {
  id: serial("id").primaryKey(),
  name: text("name").notNull(),
  power: text("power").notNull(),
  hp: integer("hp").notNull(),
});

export const monsters = pgTable("monsters", {
  id: serial("id").primaryKey(),
  name: text("name").notNull(),
  power: text("power").notNull(),
  hp: integer("hp").notNull(),
});

export const fights = pgTable("fights", {
  id: serial("id").primaryKey(),
  playerId: integer("player_id"),
  characterIds: integer("character_ids")
    .notNull()
    .references(() => characters.id).array().default((sql`ARRAY[]::integer[]`)),
  monsterIds: integer("monster_ids")
    .notNull()
    .references(() => monsters.id).array().default((sql`ARRAY[]::integer[]`)),
  currentTurn: currentTurn("current_turn").notNull(),
  turnCount: integer("turn").notNull(),
  charactersHP: integer("characters_hp").array().notNull().default(sql`ARRAY[]::integer[]`),
  monstersHP: integer("monsters_hp").array().notNull() .default(sql`ARRAY[]::integer[]`),
  playerActions: text("player_actions").array().notNull().default(sql`ARRAY[]::text[]`),
  monsterActions: text("monster_actions").array().notNull().default(sql`ARRAY[]::text[]`),
  status: status("status").notNull(),
});
