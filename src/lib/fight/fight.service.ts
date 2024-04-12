import {CreateFightSchema, CreateFightUpdateScheme, Fight, FightUpdate} from "./fight.model";
import {
    createFightInRepository,
    deleteFightByIdFromRepository,
    updateFightByIdFromRepository
} from "./fight.repository";

export async function createFight(data: unknown): Promise<Fight> {
    const fightData = CreateFightSchema.parse(data);
    const result = await createFightInRepository(fightData);

    return result[0];
}

export async function updateFightById(fightId: number, data: unknown): Promise<FightUpdate | null> {
    const fightData = CreateFightUpdateScheme.parse(data);
    const result = await updateFightByIdFromRepository(fightId, fightData);

    return result[0];
}

export async function deleteFightById(fightId: number): Promise<void> {
    const fight = await deleteFightByIdFromRepository(fightId);
}