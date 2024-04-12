import { CreatePlayerSchema, Player } from "./player.model";
import {
  createPlayerInRepository,
  getAllPlayersFromRepository,
  getPlayerByIdFromRepository,
  deletePlayerFromRepository,
  updatePlayerInRepository
} from "./player.repository";

export async function createPlayer(data: unknown): Promise<Player> {
  const playerData = CreatePlayerSchema.parse(data);
  const result = await createPlayerInRepository(playerData);

  return result[0];
}

export async function getAllPlayers(): Promise<Player[]> {
  return await getAllPlayersFromRepository();
}

export async function getPlayerById(
  playerId: number
): Promise<Player[] | null> {
  return await getPlayerByIdFromRepository(playerId);
}

export async function deletePlayer(playerId: number) {
  return await deletePlayerFromRepository(playerId);
}

export async function updatePlayer(
  playerId: number,
  updatedPlayerData: Partial<Player>
): Promise<void> {
  await updatePlayerInRepository(playerId, updatedPlayerData);
}
