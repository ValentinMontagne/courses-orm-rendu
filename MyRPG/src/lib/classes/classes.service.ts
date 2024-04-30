import { Classe, CreateClasseSchema } from "./classes.model";
import { GetByIdClasseInRepository, createClasseInRepository } from "./classes.repository";

export async function createClasse(data: unknown): Promise<Classe> {
  const classeData = CreateClasseSchema.parse(data);
  const result = await createClasseInRepository(classeData);

  return result[0];
}

export async function getByIdClasse(id: string): Promise<Classe> {
    const result = await GetByIdClasseInRepository(id);
  
    return result[0];
  }
  