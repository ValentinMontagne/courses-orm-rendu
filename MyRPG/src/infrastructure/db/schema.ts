import { isNotNull } from "drizzle-orm";
import { double, float, int } from "drizzle-orm/mysql-core";
import { text, pgTable,pgEnum, serial, integer } from "drizzle-orm/pg-core";

export const players = pgTable("players", {
  id: serial("id").primaryKey(),
  email: text("email").notNull(),
  name: text("name").notNull(),
});

export const characters=pgTable("characters",{
 id:serial("id").primaryKey(),
 name:text("name").notNull(),
 xp:text("xp").notNull(),
 classId:serial("classId").references(()=>classes.id),
 playerId:serial("playerId").references(()=>players.id),
})

export const classes=pgTable("classes",{
id:serial("id").notNull().primaryKey(),
name:text("name").notNull(),
power:text("power").notNull(),
hp:integer("hp").notNull(),
})

export const monsters=pgTable("monsters",{
id:serial("id").notNull().primaryKey(),
name:text("name").notNull(),
power:integer("power").notNull(),
hp:integer("hp").notNull(),
})
export const currentTurn= pgEnum('currentTurn', ['PLAYER', 'MONSTER']);
export const status= pgEnum('status', ['IN_PROGRESS', 'PLAYER_WON','MONSTER_WON']);
export const fights = pgTable("fights", {
        id: serial("id").primaryKey(),
        playerId: serial("playerId"),
        characterIds:serial('characterIds'),
        monsterIds:serial('monsterIds'),
        currentTurn:currentTurn("currentTurn"),
        turn:text('turn').notNull(),
        charactersHP:text('characterHP').notNull(),
        monstersHP:text('monstersHP').notNull(),
        playerACtions:text('playerActions').notNull(),
        monsterActions:text('monsterActions').notNull(),
        status:status("status"),
    });