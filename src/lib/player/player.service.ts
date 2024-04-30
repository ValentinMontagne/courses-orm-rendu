import { CreatePlayerSchema, Player } from "./player.model";
import { createPlayerInRepository, getAllPlayersFromRepository, getPlayerByIdFromRepository } from "./player.repository";
 
export async function createPlayer(data: unknown): Promise<Player> {
  const playerData = CreatePlayerSchema.parse(data);
  const result = await createPlayerInRepository(playerData);
 
  return result[0];
}

export async function getAllPlayer(): Promise<Player[]> {
    const player = await getAllPlayersFromRepository();
    return player;
  }
  
  export async function getPlayerById(id: string): Promise<Player | null> {
    const player = await getPlayerByIdFromRepository(id);
    return player;
  }