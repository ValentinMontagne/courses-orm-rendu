import { CreatePlayerSchema, Player } from "./player.model";
import {
    createPlayerInRepository, deletePlayerByIdFromRepository,
    getPlayerByIdFromRepository,
    updatePlayerByIdFromRepository
} from "./player.repository";


export async function createPlayer(data: unknown): Promise<Player> {
    const playerData = CreatePlayerSchema.parse(data);
    const result = await createPlayerInRepository(playerData);

    return result[0];
}

export async function getPlayerById(playerId: number): Promise<Player | null> {
    const player = await getPlayerByIdFromRepository(playerId);

    if (!player) {
        return null;
    }

    return player;
}

export async function updatePlayerById(playerId: number, data: unknown): Promise<Player | null> {
    const playerData = CreatePlayerSchema.parse(data);
    const result = await updatePlayerByIdFromRepository(playerId, playerData);

    return result[0];
}

export async function deletePlayerById(playerId: number): Promise<void> {
    const player = await deletePlayerByIdFromRepository(playerId);
}
