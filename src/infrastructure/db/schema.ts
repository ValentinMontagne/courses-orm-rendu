import { text, pgTable, pgEnum, serial, integer } from "drizzle-orm/pg-core";

export const players = pgTable("players", {
    id: serial("id").primaryKey(),
    email: text("email").notNull(),
    name: text("name").notNull(),
});

export const characters = pgTable("characters", {
    name: text("name").notNull(),
    xp: integer("xp").notNull(),
    classId: serial("id"),
    playerId: serial("id"),
})

export const classes = pgTable("classes", {
    name: text("name").notNull(),
    power: integer("power").notNull(),
    hp: integer("hp"),
})

export const monsters = pgTable("monsters", {
    name: text("name").notNull(),
    power: integer("power").notNull(),
    hp: integer("hp"),
})

export const currentTurnEnum = pgEnum('currentTurn', ['PLAYER', 'MONSTER'])
export const statusEnum = pgEnum('status', ['IN_PROGRESS', 'PLAYER_WON', 'MONSTERS_WON'])
export const fighters = pgTable("fighters", {
    playerId: serial("id"),
    characterIds: serial("id"),
    monsterIds: serial("id"),
    currentTurn: currentTurnEnum("currenTurn"),
    turn: integer("turn"),
    charactersHP: integer("charactersHP"),
    monstersHP: integer("monstersHP"),
    playerActions: text("playerActions").array().notNull(),
    monsterActions: text("monsterActions").array().notNull(),
    status: statusEnum("status"),
})
