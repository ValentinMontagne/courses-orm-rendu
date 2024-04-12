import { text, pgTable, serial, integer, varchar } from "drizzle-orm/pg-core";
 
export const players = pgTable("players", {
  id: serial("id").primaryKey(),
  email: text("email").notNull(),
  name: text("name").notNull(),
});

export const characters = pgTable("characters", {
    id: serial("id").primaryKey(),
    name: text("name").notNull(),
    xp: integer("xp").notNull(),
    classId: serial("classId").notNull(),
    playerId: serial("playerId").notNull(),
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

export const fights = pgTable('fights', {
  id: serial('id').primaryKey(),
  playerId: integer('playerId').references(() => players.id).notNull(),
  characterIds: integer('characterIds').references(() => characters.id).array().notNull(),
  monsterIds: integer('monsterIds').references(() => monsters.id).array().notNull(),
  currentTurn : varchar('currentTurn', { enum: ["PLAYER", "MONSTRE"] }).notNull().default("PLAYER"),
  turn: integer('turn').notNull(),
  charactersHP: integer("charactersHP").notNull(),
  monstersHP: integer("monstersHP").notNull(),
  playerActions: text("playerActions").array(),
  monsterActions: text("monsterActions").array(),
  status : varchar('varchar', { enum: ["IN_PROGRESS", "PLAYER_WON","MONSTERS_WON"] })
}); 