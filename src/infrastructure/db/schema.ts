import { text, pgTable, serial, integer } from "drizzle-orm/pg-core";

export const players = pgTable("players", {
  id: serial("id").primaryKey(),
  email: text("email").notNull(),
  name: text("name").notNull(),
});
export const characters = pgTable("characters", {
    id: serial("id").primaryKey(),
    xp: text("xp").notNull(),
    name: text("name").notNull(),
    playerId:integer('playerId').notNull().references(() => players.id),
    classId:integer('classId').notNull().references(() => classes.id),
});

export const classes = pgTable("classes", {
    id: serial("id").primaryKey(),
    name: text("name").notNull(),
    power:text('power').notNull(),
    hp:text('hp').notNull(),
});

export const monsters = pgTable("monsters", {
    id: serial("id").primaryKey(),
    name: text("name").notNull(),
    power:text('power').notNull(),
    hp:text('hp').notNull(),
});

export const fights = pgTable("fights", {
    id: serial("id").primaryKey(),
    playerId: serial("playerId"),
    characterIds:serial('characterIds'),
    monsterIds:serial('monsterIds'),
    currentTurn:text('currentTurn').notNull(),
    turn:text('turn').notNull(),
    charactersHP:text('characterHP').notNull(),
    monstersHP:text('monstersHP').notNull(),
    playerACtions:text('playerActions').notNull(),
    monsterActions:text('monsterActions').notNull(),
    status:text('status').notNull(),
});