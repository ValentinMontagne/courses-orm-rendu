import { createMonsterInRepository } from "./monster.repository";
import { CreateMonsterSchema } from "./monsters.model";

export const createMonster = async (data: unknown) => {
    const monsterData = CreateMonsterSchema.parse(data);
    const result = await createMonsterInRepository(monsterData);

    return result[0];
}