import { CreateClasseSchema, Classe } from "./model";
import { createClasseInRepository } from "./repository";

export async function createClasse(data: unknown): Promise<Classe> {
  const classeData = CreateClasseSchema.parse(data);
  const result = await createClasseInRepository(classeData);

  return result[0];
}
