import { HttpBadRequest, HttpForbidden } from "@httpx/exception";
import { Player, CreatePlayerSchema } from "./player.model";
import { createPlayerInRepository, getPlayersInRepository } from "./player.repository";

export async function createPlayer(data: unknown): Promise<Player> {
    const player = CreatePlayerSchema.safeParse(data);
    
    if (!player.success) {
        throw new HttpBadRequest(player.error);
    }
    
    const result = await createPlayerInRepository(player.data);
    
    if (!result) {
        throw new HttpForbidden("Player already exists");
    }
    
    return result[0];
}

export async function getPlayers(): Promise<Player[]> {
    return getPlayersInRepository()
}
