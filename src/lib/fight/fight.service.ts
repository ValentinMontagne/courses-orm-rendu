import {
    CreateFight,
    CreateFightDtoSchema,
    CreateFightSchema,
    Fight,
    PutFightSchema,
    statusType,
    turnType
} from "./fight.model";
import {
    createFightInRepository,
    findAllInFightRepository,
    findIdInFightRepository,
    putFightRepository
} from "./fight.repository";
import {findIdCharacter} from "../characters/character.service";
import {findIdMonster} from "../monster/monster.service";
import {v} from "@httpx/exception/dist/HttpClientException-6qDwRaH4";

export async function createFight(data: unknown): Promise<Fight> {

    const fightData = CreateFightDtoSchema.parse(data);
    let reelData = data as CreateFight;

    let hpPlayer = 0
    const playerPromises = fightData.playerIds.map((value) => {
        return findIdCharacter(value).then((character) => {

            hpPlayer = hpPlayer + character[0]["classes"]["hp"]

        })
    })

    let hpMonster = 0
    const monsterPromises = fightData.monsterIds.map((value) => {
        return findIdMonster(value).then((monster) => {

            hpMonster = hpMonster + monster[0].hp

        })

    })

    await Promise.all([...playerPromises, ...monsterPromises]);

    reelData.monstersHP = hpMonster
    reelData.charactersHP = hpPlayer;
    reelData.status = statusType.IN_PROGRESS
    reelData.currentTurn = turnType.PLAYER
    reelData.turn = 0
    reelData.monsterActions = []
    reelData.playerActions = []

    const result = await createFightInRepository(reelData);

    return result[0];
}

export async function putFight(data: unknown,id: number): Promise<Fight> {
    const monsterData = PutFightSchema.parse(data);
    const result = await putFightRepository(monsterData,id);

    return result[0];
}

export async function findAllFight(): Promise<Fight[]> {
    return findAllInFightRepository();
}

export async function findIdFight(id: number): Promise<Fight[]> {
    return findIdInFightRepository(id);
}
