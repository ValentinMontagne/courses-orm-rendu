import {CreateMonsterSchema, Monster} from "./monster.model";
import {
    createMonsterInRepository,
    deleteMonsterByIdFromRepository,
    getMonsterByIdFromRepository, updateMonsterByIdFromRepository
} from "./monster.repository";
import {deletePlayerByIdFromRepository, updatePlayerByIdFromRepository} from "../player/player.repository";
import {CreatePlayerSchema, Player} from "../player/player.model";

export async function createMonster(data: unknown): Promise<Monster> {
    const monsterData = CreateMonsterSchema.parse(data);
    const result = await createMonsterInRepository(monsterData);

    return result[0];
}

export async function getMonsterById(playerId: number): Promise<Monster | null> {
    const monster = await getMonsterByIdFromRepository(playerId);

    if (!monster) {
        return null;
    }

    return monster;
}

export async function deleteMonsterById(playerId: number): Promise<void> {
    const monster = await deleteMonsterByIdFromRepository(playerId);
}

export async function updateMonsterById(monsterId: number, data: unknown): Promise<Monster | null> {
    const monsterData = CreateMonsterSchema.parse(data);
    const result = await updateMonsterByIdFromRepository(monsterId, monsterData);

    return result[0];
}