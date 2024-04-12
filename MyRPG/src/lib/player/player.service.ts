import { CreatePlayerSchema, Player } from "./player.model";
import { createPlayerInRepository } from "./player.repository";
 
export async function createPlayer(data: unknown): Promise<Player> {
  const playerData = CreatePlayerSchema.parse(data);
  const result = await createPlayerInRepository(playerData);
 
  return result[0];
}