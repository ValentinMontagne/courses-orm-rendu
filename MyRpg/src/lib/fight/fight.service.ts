import {HttpBadRequest, HttpForbidden, HttpNotFound} from "@httpx/exception";
import {
    createFightInRepository, deleteFightByIdInteRepository,
    getAllFightInRepository,
    getFightByIdInRepository, updateFightAfterAttackByIdInRepository,
    updateFightByIdInRepository
} from "./fight.repository";
import {attackModel, CreateFight, CreateFightSchema, Fight, NoIdFight, NoIdFightSchema} from "./fight.model";
import {findMonsterById} from "../monster/monster.service";
import {findCharacterById} from "../character/character.service";


export async function getAllFight(): Promise<Fight[]> {
    const result = getAllFightInRepository();
    if (!result) {
        throw new HttpNotFound();
    }
    return result
}

export async function getFightById(data: number): Promise<Fight> {
    const result = await getFightByIdInRepository(data);
    if (!result) {
        throw new HttpNotFound();
    }
    return result[0];
}

export async function createFight(data: CreateFight): Promise<Fight> {
    const fightData = CreateFightSchema.safeParse(data);
    if (fightData.success) {
        let createData: NoIdFight = {
            playerId: data.playerId,
            characterIds: data.characterIds,
            monsterIds: data.monsterIds,
            currentTurn: data.currentTurn,
            turn: 0,
            charactersHP: 0,
            monstersHP: 0,
            playerActions: [],
            monsterActions: [],
            status: "IN_PROGRESS"
        }
        for (const id of data.monsterIds) {
            const monster = await findMonsterById(String(id));
            createData.monstersHP += monster.hp || 0
        }
        for (const id of data.characterIds) {
            const character = await findCharacterById(String(id));
            createData.charactersHP += character.class?.hp || 0;
        }
        const result = await createFightInRepository(createData);
        return result[0];

    } else {
        throw new HttpBadRequest(fightData.error);
    }
}

export async function attackFightById(id: number, data: attackModel) {
    const currentFight = await getFightById(id);
    if (data.currentActions === currentFight.currentTurn) {
        if (data.currentActions === "PLAYER") {
            if (currentFight.playerActions) {
                currentFight.playerActions.push("attack")
            } else {
                currentFight.playerActions = []
                currentFight.playerActions.push("attack")
            }
            for (const id of currentFight.characterIds) {
                const character = await findCharacterById(String(id));
                currentFight.monstersHP -= character.class?.power || 0;
                if (currentFight.monstersHP <= 0) {
                    currentFight.monstersHP = 0;
                    currentFight.status = "PLAYER_WON";
                }
            }
            currentFight.currentTurn = "MONSTRE";

        } else {
            if (currentFight.monsterActions) {
                currentFight.monsterActions.push("attack")
            } else {
                currentFight.monsterActions = []
                currentFight.monsterActions.push("attack")
            }
            for (const id of currentFight.monsterIds) {
                const monster = await findMonsterById(String(id));
                currentFight.monstersHP -= monster.power || 0;
                if (currentFight.charactersHP <= 0) {
                    currentFight.charactersHP = 0;
                    currentFight.status = "MONSTERS_WON";
                }
            }
            currentFight.currentTurn = "PLAYER";
        }
        currentFight.turn += 1;
        const updatedFight = await updateFightAfterAttackByIdInRepository(id, currentFight);
        return updatedFight[0];
    } else {
        throw new HttpForbidden()
    }
}

export async function updateFightById(id: number, data: any) {
    const fightData = NoIdFightSchema.safeParse(data);
    if (fightData.success) {
        const updatedFight = await updateFightByIdInRepository(id, data);
        if (updatedFight.length === 0) {
            throw new HttpNotFound()
        }
        return updatedFight[0];
    } else {
        throw new HttpBadRequest(fightData.error);
    }
}

export async function deleteFightById(id: number) {
    const deleteFight = await deleteFightByIdInteRepository(id);
    if (deleteFight.length === 0) {
        throw new HttpNotFound()
    }
    return deleteFight[0];
}