import { CreateCharacterSchema, Character } from "./character.model";
import { createCharacterInRepository } from "./character.repository";
 
export async function createPlayer(data: unknown): Promise<Character> {
  const playerData = CreateCharacterSchema.parse(data);
  const result = await createCharacterInRepository(playerData);
 
  return result[0];
}