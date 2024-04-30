	
import { text, pgTable, serial, integer, pgEnum, } from "drizzle-orm/pg-core";
 
export const players = pgTable("players", {
  id: serial("id").primaryKey(),
  email: text("email").notNull(),
  name: text("name").notNull(),
});

export const characters = pgTable("characters", {
    id: serial("id").primaryKey(),
    xp: integer("xp").notNull(),
    name: text("name").notNull(),
    classId: integer("classId").notNull().references(() => classes.id), 
    playerId: integer("playerId").notNull().references(() => players.id), 
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

export const currentTurnEnum = pgEnum('currentTurn', ['PLAYER', 'MONSTER']);
export const statusEnum = pgEnum("status", ["IN_PROGRESS", "PLAYER_WON", "MONSTERS_WON"]);

export const fights = pgTable("fights", {
    id: serial("id").primaryKey(),
    playerId: integer("playerId")
    .notNull()
    .references(() => players.id),
  characterIds: integer("characterIds").notNull().references(() => characters.id).array(),
  monsterIds: integer("monsterIds").notNull().references(() => monsters.id).array(),
  currentTurn: currentTurnEnum('currentTurn'), 
  turn: integer("turn").notNull(), 
  charactersHP: integer("charactersHP").notNull(), 
  monstersHP: integer("monstersHP").notNull(), 
  playerActions: text("playerActions").array(), 
  monsterActions: text("monsterActions").array(), 
  status: statusEnum('status')
});