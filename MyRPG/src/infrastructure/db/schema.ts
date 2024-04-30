import { sql } from "drizzle-orm";
import { text, pgTable, serial, pgEnum, integer} from "drizzle-orm/pg-core";

export const enumStatus = pgEnum("status", ["IN_PROGRESS", "PLAYER_WON", "MONSTERS_WON"]);
export const enumTurn = pgEnum("current_turn", ["PLAYER", "MONSTER"]);


export const players = pgTable("players", {
  id: serial("id").primaryKey(),
  email: text("email").notNull(),
  name: text("name").notNull(),
});

export const characters = pgTable("characters", {
  id: serial("id").primaryKey(),
  name: text("name").notNull(),
  xp: integer("xp").notNull(),
  classId: serial("class_id").notNull().references(() => classes.id),
  playerId: serial("player_id").notNull().references(() => players.id),
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

export const fights = pgTable("fights", {
  id: serial("id").primaryKey(),
  playerId: serial("player_id").notNull().references(() => players.id),
  characterIds: integer("character_ids").notNull().references(() => characters.id).array().default((sql`'{}'::integer[]`)),
  monsterIds: integer("monster_ids").notNull().references(() => monsters.id).array().default((sql`'{}'::integer[]`)),
  currentTurn: enumTurn("current_turn").notNull(),
  turn: integer("turn").notNull(),
  charactersHP: integer("characters_hp").notNull(),
  monstersHP: integer("monsters_hp").notNull(),
  playersActions: text("players_actions").notNull().array().default((sql`'{}'::text[]`)),
  monstersActions: text("monsters_actions").notNull().array().default((sql`'{}'::text[]`)),
  status: enumStatus("status").notNull(),
});