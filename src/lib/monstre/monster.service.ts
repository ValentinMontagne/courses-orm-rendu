import { CreateMonsterSchema, Monster } from "./monster.model";
import { createMonsterInRepository, getMonstersInRepository } from "./monster.repository";

export async function createMonsterService(data: unknown): Promise<Monster> {
    const MonsterData = CreateMonsterSchema.parse(data);
    const result = await createMonsterInRepository(MonsterData);

    return result[0];
}

export async function getAllMonsters(): Promise<Monster[]> {
    const result = await getMonstersInRepository();
    return result;
}