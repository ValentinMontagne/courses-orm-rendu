import { CreateCharacterSchema, Character } from "./charactere.model";
import { createCharacterInRepository } from "./charactere.repository";

export async function CreateCharacter(data: unknown): Promise<Character> {
  const CharacterData = CreateCharacterSchema.parse(data);
  const result = await createCharacterInRepository(CharacterData);

  return result[0];
}
