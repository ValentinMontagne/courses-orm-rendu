import { HttpBadRequest, HttpNotFound } from "@httpx/exception";
import { CreatePlayerSchema, Player } from "./player.model";
import { createPlayerInRepository, deletePlayerById, findAll, findById, updatePlayerById } from "./player.repository";

export async function createPlayer(data: unknown): Promise<Player> {
  const playerData = CreatePlayerSchema.parse(data);
  const result = await createPlayerInRepository(playerData);

  return result[0];
}

export async function findAllPlayers(): Promise<Player[]> {
    return findAll();
  }

export async function findPlayerById(id: string){
    const playerId = parseInt(id);
    const existingPlayer = await findById(playerId);
    if (!existingPlayer) {
        throw new HttpNotFound("Joueur non trouvé.");
      }
    return existingPlayer;
}

export async function updatePlayer(id: string, data: Partial<Player>){
    const playerId = parseInt(id);
    const existingPlayer = await findPlayerById(id);
    if (!existingPlayer) {
      throw new HttpNotFound("Joueur non trouvé.");
    }
    const updatedPlayer = await updatePlayerById(playerId, data);
    if (!updatedPlayer) {
      throw new HttpBadRequest("La mise à jour du joueur a échoué.");
    }
    return updatedPlayer;
}

export async function deletePlayer(id: string){
    const playerId = parseInt(id);
    return deletePlayerById(playerId);
  }
  