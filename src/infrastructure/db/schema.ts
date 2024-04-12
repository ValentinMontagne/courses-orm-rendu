import {text, pgTable, serial, integer, pgEnum} from "drizzle-orm/pg-core";

export const players = pgTable("players", {
    id: serial("id").primaryKey(),
    email: text("email").notNull(),
    name: text("name").notNull(),
});

export const characters = pgTable("characters", {
    id: serial("id").primaryKey(),
    name: text("name").notNull(),
    xp: integer("xp").notNull(),
    level: integer("level").notNull(),
    classId: integer('class_id').notNull().references(() => classes.id),
    playerId: integer('player_id').notNull().references(() => players.id),
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
    xpGiven: integer("xp_given").notNull(),
});

export const currentTurn = pgEnum("current_turn", ["PLAYER", "MONSTER"]);
export const status = pgEnum("status", ["IN_PROGRESS", "PLAYER_WON", "MONSTER_WON"]);
export const fights = pgTable("fights", {
    id: serial("id").primaryKey(),
    playerId: integer('player_id').notNull().references(() => players.id),
    charactersId: integer('characters_id').references(() => characters.id).array().notNull(),
    monstersId: integer('monsters_id').references(() => monsters.id).array().notNull(),
    currentTurn: currentTurn("current_turn").notNull(),
    turn: integer("turn").notNull(),
    charactersHP: integer('characters_hp').notNull(),
    monstersHP: integer('monsters_hp').notNull(),
    playerActions: text('player_actions').array().notNull(),
    monsterActions: text('monster_actions').array().notNull(),
    status: status("status").notNull(),
});