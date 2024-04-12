import {db} from "../../infrastructure/db";
import {characters, fights, monsters} from "../../infrastructure/db/schema";
import {CreateFight, UpdateFight} from "./fight.model";
import {getCharacterById} from "../character/character.service";
import {getCharacterByIdFromRepository} from "../character/character.repository";
import {getMonsterByIdFromRepository} from "../monsters/monster.repository";
import {eq, or} from "drizzle-orm";

export async function createFightInRepository(data: CreateFight) {
    try {
        let charactersHp = data.charactersHP || 0;

        for (const characterId of data.charactersId) {
            const character = await getCharacterByIdFromRepository(characterId);
            if (character) {
                data.charactersHP += character.class.hp;
            } else {
                throw new Error(`Character with id ${characterId} not found`);
            }
        }

        for (const monstersId of data.monstersId) {
            const monster = await getMonsterByIdFromRepository(monstersId);
            if (monster) {
                data.monstersHP += monster.hp;
            } else {
                throw new Error(`Monster with id ${monstersId} not found`);
            }
        }

        const dataWithHp = { ...data, charactersHp };

        return db.insert(fights).values(dataWithHp).returning();
    } catch (error) {
        console.error("Error creating fight in repository:", error);
        throw error;
    }
}

export async function updateFightByIdFromRepository(fightId: number, data: UpdateFight) {
    try {
        let fightArray = await db.select().from(fights).where(eq(fights.id, fightId));
        let fight = fightArray[fightArray.length - 1]; // Utilisez fightArray.length

        if (data.playerActions[data.playerActions.length - 1] === "ATTACK" && fight.currentTurn === "PLAYER") {
            const player = await getCharacterByIdFromRepository(fight.charactersId[0]);
            if (player) {
                const playerPower = player.class.power;
                fight.monstersHP -= playerPower;
                fight.currentTurn = "MONSTER";
            }
        }

        if (data.monsterActions[data.monsterActions.length - 1] === "ATTACK" && fight.currentTurn === "MONSTER") {
            const monster = await getMonsterByIdFromRepository(fight.monstersId[0]);
            if (monster) {
                const monsterPower = monster.power;
                fight.charactersHP -= monsterPower;
                fight.currentTurn = "PLAYER";
            }
        }

        if (fight.charactersHP <= 0 || fight.monstersHP <= 0) {
            fight.status = fight.charactersHP <= 0 ? "MONSTER_WON" : "PLAYER_WON";
            if (fight.status === "PLAYER_WON") {
                const player = await getCharacterByIdFromRepository(fight.charactersId[0]);
                const monster = await getMonsterByIdFromRepository(fight.monstersId[0]);
                if (player && monster) {
                    player.xp += monster.xpGiven;
                    await db.update(characters).set(player).where(eq(characters.id, player.id));
                }
            }

            return db.update(fights).set(fight).where(eq(fights.id, fightId)).returning();
        }

        return db.update(fights).set(fight).where(eq(fights.id, fightId)).returning();

    } catch (error) {
        console.error("Error updating fight by ID from repository:", error);
        throw error;
    }
}

export function deleteFightByIdFromRepository(fightId: number) {
    return db.delete(fights).where(eq(fights.id, fightId)).returning();
}