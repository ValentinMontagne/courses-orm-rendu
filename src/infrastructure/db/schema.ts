import {text, pgTable, serial, integer, pgEnum} from "drizzle-orm/pg-core";
import {array, enum} from "zod";

export const players = pgTable("players", {
    id: serial("id").primaryKey(),
    email: text("email").notNull(),
    name: text("name").notNull(),
});

export const classes = pgTable("classes", {
    id: serial("id").primaryKey(),
    name: text("name").notNull(),
    power: integer("power").notNull(),
    hp: integer("hp").notNull(),
});

export const characters = pgTable("characters", {
    id: serial("id").primaryKey(),
    name: text("name").notNull(),
    xp: integer("xp").notNull(),
    classId: integer("class_id").references(() => classes.id).notNull(),
    playerId: integer("player_id").references(() => players.id).notNull(),
});

export const monsters = pgTable("monsters", {
    id: serial("id").primaryKey(),
    name: text("name").notNull(),
    power: integer("power").notNull(),
    hp: integer("hp").notNull(),
});

const currentTypeEnum = pgEnum( "current_turn",["PLAYER", "MONSTER"])
const currentStatus = pgEnum( "current_turn",["PLAYER", "MONSTER"])


export const fights = pgTable("fights", {
    id: serial("id").primaryKey(),
    playerId: integer("player_id").references(() => players.id).notNull(),
    characterIds: integer("character_ids").references(() => characters.id).notNull().array(),
    monsterIds: integer("monsters_ids").references(() => monsters.id).notNull().array(),
    currentTurn: currentTypeEnum("current_turn").notNull(),
    turn: serial("turn").notNull(),
    charactersHP: integer("characters_hp").notNull(),
    monstersHP: integer("monsters_hp").notNull(),
    playerActions: text("player_actions").notNull(),
    monsterActions: text("monster_actions").notNull(),
    status: text("status").notNull(),
});
