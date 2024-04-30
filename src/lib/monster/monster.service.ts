import {CreateMonsterSchema, Monster, PutMonsterSchema} from "./monster.model";
import {
    createMonsterInRepository, deleteMonsterRepository,
    findAllInMonsterRepository,
    findIdInMonsterRepository,
    putMonsterRepository
} from "./monster.repository";


export async function createMonster(data: unknown): Promise<Monster> {
    const monsterData = CreateMonsterSchema.parse(data);
    const result = await createMonsterInRepository(monsterData);

    return result[0];
}

export async function PutMonster(data: unknown,id: number): Promise<Monster> {
    const monsterData = PutMonsterSchema.parse(data);
    const result = await putMonsterRepository(monsterData,id);

    return result[0];
}

export async function findAllMonster(): Promise<Monster[]> {
    return findAllInMonsterRepository();
}

export async function findIdMonster(id: number): Promise<Monster[]> {
    return findIdInMonsterRepository(id);
}

export async function deleteMonster(id: number): Promise<Monster[]> {
    return deleteMonsterRepository(id);
}
