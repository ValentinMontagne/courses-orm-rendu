import { CreateClasseSchema, Classe } from "./classe.model";
import { createClasseInRepository } from "./classe.repository";


export async function createClasse(data: unknown): Promise<Classe> {
  const playerData = CreateClasseSchema.parse(data);
  const result = await createClasseInRepository(playerData);

  return result[0];
}
