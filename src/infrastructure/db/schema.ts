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
    classId: serial("classId").notNull().references(() => classes.id),
    playerId: serial("playerId").notNull().references(() => players.id)
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


export const turnEnum = pgEnum('currentTurn', ['PLAYER', 'MONSTER']);
export const statusEnum = pgEnum('statusEnum', ['IN_PROGRESS', 'PLAYER_WON', 'MONSTERS_WON']);
export const fights = pgTable("fights", {
    id: serial("id").primaryKey(),
    playerIds: integer("playerIds").notNull().references(() => players.id).array(),
    monsterIds: integer("monsterIds").notNull().references(() => monsters.id).array(),
    currentTurn: turnEnum("currentTurn").notNull(),
    turn: integer("turn").notNull().default(0),
    charactersHP: integer("charactersHP").notNull().default(0),
    monstersHP: integer("monstersHP").notNull().default(0),
    playerActions: text("playerActions").array(),
    monsterActions: text('monsterActions').array(),
    status: statusEnum("status").notNull()
});
