import { text, pgTable, serial, integer, pgEnum } from "drizzle-orm/pg-core";

export const statusEnum = pgEnum("status", [
  "IN_PROGRESS",
  "PLAYER_WON",
  "MONSTERS_WON",
]);
export const currentTurn = pgEnum("currentTurn", ["PLAYER", "MONSTER"]);

export const players = pgTable("players", {
  id: serial("id").primaryKey(),
  email: text("email").notNull(),
  name: text("name").notNull(),
});
export const Classes = pgTable("Classes", {
  id: serial("id").primaryKey(),
  power: integer("power").notNull(),
  hp: integer("hp").notNull(),
  name: text("name").notNull(),
});
export const Monsters = pgTable("Monsters", {
  id: serial("id").primaryKey(),
  power: integer("power").notNull(),
  hp: integer("hp").notNull(),
  name: text("name").notNull(),
});

export const Characters = pgTable("Characters", {
  id: serial("id").primaryKey(),
  name: text("name").notNull(),
  xp: integer("xp").notNull(),
  classId: integer("class_id")
    .notNull()
    .references(() => Classes.id),
  playerId: integer("player_id")
    .notNull()
    .references(() => players.id),
});
export const Fights = pgTable("Fights", {
  playerId: integer("playerId")
    .notNull()
    .references(() => players.id),
  characterIds: integer("characterIds")
    .references(() => Characters.id)
    .array(),
  monsterIds: integer("monsterIds")
    .references(() => Monsters.id)
    .array(),
  currentTurn: currentTurn("currentTurn"),
  turn: integer("turn").notNull().default(0),
  charactersHP: integer("charactersHP").notNull().default(0),
  monstersHP: integer("monstersHP").notNull().default(0),
  playerActions: text("playerActions").array(),
  monsterActions: text("monsterActions").array(),
  status: statusEnum("status"),
});
