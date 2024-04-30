import { CreateFighterSchema, Fighter } from "./fighter.model";
import { createFighterInRepository } from "./fighter.repository";

export async function createFighter(data: unknown): Promise<Fighter> {
    const classFighter = CreateFighterSchema.parse(data);
    const result = await createFighterInRepository(fighterData);

    return result[0];
}
