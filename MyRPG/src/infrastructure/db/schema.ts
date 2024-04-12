import { text, pgTable, serial, integer, pgEnum, json } from "drizzle-orm/pg-core";

export const players = pgTable("players", {
  id: serial("id").primaryKey(),
  email: text("email").notNull(),
  name: text("name").notNull(),
});

export const characters = pgTable("characters", {
    id: serial("id").primaryKey(),
    name: text("name").notNull(),
    classId: integer('classId').notNull().references(() => classes.id),
    playerId: integer('playerId').notNull().references(() => players.id),
});

export const classes = pgTable("classes", {
    id: serial("id").primaryKey(),
    name: text("name").notNull(),
    power: integer("power").notNull(),
    hp: integer("hp").notNull(),
});


export const monsters = pgTable("monters", {
  id: serial("id").primaryKey(),
  name: text("name").notNull(),
  power: integer("power").notNull(),
  hp: integer("hp").notNull(),
});

export const currentTurnEnum = pgEnum('currentTurn', ['PLAYER', 'MONSTER']);
export const statusEnum = pgEnum('status', ['IN_PROGRESS','PLAYER_WON','MONSTERS_WON']);

export const fights = pgTable("fights", {
  id: serial("id").primaryKey(),
  playerId: integer('playerId').notNull().references(() => players.id),
  monsterIds: json('monsterIds').$type<number[]>(),
  characterIds: json('characterIds').$type<number[]>(),
  turn : integer("turn").notNull().default(0),
  charactersHP : integer("charactersHP"),
  monstersHP : integer("monstersHP"),
  playerActions: json('playerActions').$type<string[]>(),
  monsterActions: json('monsterActions').$type<string[]>(),
  currentTurn : currentTurnEnum('currentTurn'),
  status : statusEnum('statusEnum')
});