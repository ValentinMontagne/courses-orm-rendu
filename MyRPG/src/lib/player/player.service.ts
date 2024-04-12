import { CreatePlayerSchema, Player } from "./player.model";
import { createPlayerInRepository, deletePlayerInRepository, getPlayersInRepository } from "./player.repository";

export async function createPlayer(data: unknown): Promise<Player> {
  const playerData = CreatePlayerSchema.parse(data);
  const result = await createPlayerInRepository(playerData);

  return result[0];
}

export async function getPlayers() : Promise<Player[]> {
    const result = await getPlayersInRepository()
    return result;
}

export async function deletePlayer(id : number) : Promise<Player> {
    const result= await deletePlayerInRepository(id);
    return result[0];
}
