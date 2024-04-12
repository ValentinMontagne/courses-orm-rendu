import { CreateClassSchema, Class } from "./class.model";
import {
    createClassInRepository,
    deleteClassByIdFromRepository,
    getClassByIdFromRepository,
    updateClassByIdFromRepository
} from "./class.repository";
import {CreatePlayerSchema, Player} from "../player/player.model";
import {
    deletePlayerByIdFromRepository,
    getPlayerByIdFromRepository,
    updatePlayerByIdFromRepository
} from "../player/player.repository";


export async function createClass(data: unknown): Promise<Class> {
    const classData = CreateClassSchema.parse(data);
    const result = await createClassInRepository(classData);

    return result[0];
}

export async function getClassById(playerId: number): Promise<Class | null> {
    const result = await getClassByIdFromRepository(playerId);

    if (!result) {
        return null;
    }

    return result;
}

export async function updateClassById(classId: number, data: unknown): Promise<Class | null> {
    const classData = CreateClassSchema.parse(data);
    const result = await updateClassByIdFromRepository(classId, classData);

    return result[0];
}

export async function deleteClassById(classId: number): Promise<void> {
    const result = await deleteClassByIdFromRepository(classId);
}