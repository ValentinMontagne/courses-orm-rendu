import {HttpBadRequest, HttpNotFound} from "@httpx/exception";
import {CreateMonsterSchema, Monster, UpdateMonsterSchema} from "./monsters.model";
import {
    createMonsterInRepository, deleteMonsterByIdInteRepository,
    getAllMonsterInRepository,
    getMonsterByIdInRepository,
    updateMonsterByIdInRepository
} from "./monster.repository";

export async function getAllMonster(): Promise<Monster[]> {
    const result = getAllMonsterInRepository();
    if (!result){
        throw new HttpNotFound();
    }
    return result
}

export async function getMonsterById(data: number): Promise<Monster> {
    const result = await getMonsterByIdInRepository(data);
    if (!result){
        throw new HttpNotFound();
    }
    return result[0];
}

export async function createMonster(data: any): Promise<Monster> {
    const monsterData = CreateMonsterSchema.safeParse(data);
    if (monsterData.success){
        const result = await createMonsterInRepository(data);
        return result[0];
    }else {
        throw new HttpBadRequest(monsterData.error);
    }
}

export async function updateMonsterById(id: number, data: any){
    const classData = UpdateMonsterSchema.safeParse(data);
    if (classData.success){
        const updatedMonster = await updateMonsterByIdInRepository(id, data);
        if (updatedMonster.length === 0) {
            throw new HttpNotFound()
        }
        return updatedMonster[0];
    }else {
        throw new HttpBadRequest(classData.error);
    }
}

export async function deleteMonsterById(id: number){
    const deleteMonster = await deleteMonsterByIdInteRepository(id);
    if (deleteMonster.length === 0) {
        throw new HttpNotFound()
    }
    return deleteMonster[0];
}
