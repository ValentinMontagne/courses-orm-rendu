import {CreatePlayerSchema, Player, UpdatePlayerSchema} from "./player.model";
import {
    createPlayerInRepository, deletePlayerByIdInteRepository,
    getAllPlayerInRepository,
    getPlayerByIdInRepository,
    updatePlayerByIdInRepository
} from "./player.repository";
import {HttpBadRequest, HttpInternalServerError, HttpNotFound} from "@httpx/exception";

export async function getAllPlayer(): Promise<Player[]> {
    const result =  getAllPlayerInRepository();
    if (!result){
        throw new HttpNotFound();
    }
    return result;
}

export async function getPlayerById(data: number): Promise<Player> {
    const result = await getPlayerByIdInRepository(data);
    if (!result){
        throw new HttpNotFound();
    }
    return result[0];
}

export async function createPlayer(data: any): Promise<Player> {
    const playerData = CreatePlayerSchema.safeParse(data);
    if (playerData.success){
        const result = await createPlayerInRepository(data);
        return result[0];
    }else {
        throw new HttpBadRequest(playerData.error);
    }
}
export async function updatePlayerById(id: number, data: any){
    const playerData = UpdatePlayerSchema.safeParse(data);
    if (playerData.success){
        const updatedPlayer = await updatePlayerByIdInRepository(id, data);
        if (updatedPlayer.length === 0) {
            throw new HttpNotFound()
        }
        return updatedPlayer[0];
    }else {
        throw new HttpBadRequest(playerData.error);
    }
}

export async function deletePlayerById(id: number){
        const deletePlayer = await deletePlayerByIdInteRepository(id);
        if (deletePlayer.length === 0) {
            throw new HttpNotFound()
        }
        return deletePlayer[0];
}
