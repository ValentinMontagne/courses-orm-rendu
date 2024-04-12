import { CreatePlayerSchema, Player } from "./player.model";
import { createPlayerInRepository, deletePlayerInRepository, getAllPlayersInRepository, getPlayerInRepository, updatePlayerInRepository } from "./player.repository";

export async function createPlayer(data: unknown): Promise<Player> {
  const playerData = CreatePlayerSchema.parse(data);
  const result = await createPlayerInRepository(playerData);

  return result[0];
}

export async function getAllPlayers(): Promise<Player[]> {
  return await getAllPlayersInRepository();
}

export async function getPlayerById(playerId: number): Promise<Player[]> {
  return await getPlayerInRepository(playerId);
}

export async function updatePlayerById(playerId: number, updatedPlayerData: Partial<Player>): Promise<void> {
  await updatePlayerInRepository(playerId, updatedPlayerData);
}


export async function deletePlayerById(playerId: number) {
  return await deletePlayerInRepository(playerId);
}