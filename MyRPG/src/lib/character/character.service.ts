import { CreateCharacterSchema, character } from "./character.model";
import { createCharacterInRepository } from "./character.repository";

export async function CreateCharacter(data: unknown): Promise<character> {
  const characterData = CreateCharacterSchema.parse(data);
  const result = await createCharacterInRepository(characterData);

  return result[0];
}