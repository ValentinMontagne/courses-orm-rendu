import {text, pgTable, serial, integer, varchar} from "drizzle-orm/pg-core";

export const players = pgTable("players", {
    id: serial("id").primaryKey(),
    email: text("email").notNull(),
    name: text("name").notNull(),
});

export const classes = pgTable('classes', {
    id: serial('id').primaryKey(),
    name: text('name').notNull(),
    power: integer('power').notNull(),
    hp: integer('hp').notNull()
});
export const characters = pgTable('characters', {
    id: serial('id').primaryKey(),
    name: text('name').notNull(),
    xp: integer('xp').notNull(),
    classId: integer('class_id').references(() => classes.id).notNull(),
    playerId: integer('player_id').references(() => players.id).notNull(),
});
export const monsters = pgTable('monsters', {
    id: serial('id').primaryKey(),
    name: text('name').notNull(),
    power: integer('power').notNull(),
    hp: integer('hp').notNull()
})
export const fights = pgTable('fights', {
    id: serial('id').primaryKey(),
    playerId: integer('player_ids').references(() => players.id).notNull(),
    characterIds: integer('character_ids').references(() => characters.id).array().notNull(),
    monsterIds: integer('monsterIds_ids').references(() => monsters.id).array().notNull(),
    currentTurn : varchar('current_turn', { enum: ["PLAYER", "MONSTRE"] }).notNull().default("PLAYER"),
    turn: integer('turn').notNull(),
    charactersHP: integer("characters_hp").notNull(),
    monstersHP: integer("monsters_hp").notNull(),
    playerActions: text("player_actions").array(),
    monsterActions: text("monster_actions").array(),
    status : varchar('varchar', { enum: ["IN_PROGRESS", "PLAYER_WON","MONSTERS_WON"] })
})

