import {CreateMonsterSchema, Monster} from "./monsters.model";
import {createMonsterInRepository} from "./monsters.repository";

export async function createMonster(data: unknown): Promise<Monster> {
    const monsterData = CreateMonsterSchema.parse(data)
    const result = await createMonsterInRepository(monsterData);

    return result[0];
}