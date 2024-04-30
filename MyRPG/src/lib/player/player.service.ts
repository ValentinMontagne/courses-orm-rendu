import { CreatePlayerSchema, Player } from "./player.model";
import { UpdatePlayerInRepository, createPlayerInRepository, getAllPlayersInRepository, getPlayerByIdInRepository } from "./player.repository";

export async function createPlayer(data: unknown): Promise<Player> {
  const playerData = CreatePlayerSchema.parse(data);
  const result = await createPlayerInRepository(playerData);

  return result[0];
}
export async function getAllPlayer(): Promise<Player[]> {
    const players = await getAllPlayersInRepository();
    return players;
  }

export async function getPlayerById(id : number): Promise<Player[]> {
    const players = await getPlayerByIdInRepository(id);
    return players;
}

export async function updatePlayerById(id: number): Promise<Player> {
    const result = await UpdatePlayerInRepository(id);
    return result[0];
}
  