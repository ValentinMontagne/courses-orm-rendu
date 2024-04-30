import { text, integer, pgTable, serial } from "drizzle-orm/pg-core";

export const players = pgTable("players", {
    id: serial("id").primaryKey(),
    email: text("email").notNull(),
    name: text("name").notNull(),
});

export const characters = pgTable("characters", {
    id: serial("id").primaryKey(),
    name: text("name").notNull(),
    xp: integer("xp").notNull(),
    playerid: integer("playerid").references(() => players.id),
    classid: integer("classid").references(() => classes.id)
})

export const classes = pgTable("classes", {
    id: serial("id").primaryKey(),
    name: text("name").notNull(),
    power: integer("power").notNull(),
    hp: integer("hp").notNull()
})

export const monsters = pgTable("monsters", {
    id: serial("id").primaryKey(),
    name: text("name").notNull(),
    power: integer("power").notNull(),
    hp: integer("hp").notNull()
})