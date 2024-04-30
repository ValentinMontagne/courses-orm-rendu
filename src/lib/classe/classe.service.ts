import { Classe, CreateClasseSchema } from "./classe.model";
import { createCreateClassesInRepository, getAllClassesFromRepository, getClassesByIdFromRepository } from "./classe.repository";

 
export async function createClasse(data: unknown): Promise<Classe> {
  const classeData = CreateClasseSchema.parse(data);
  const result = await createCreateClassesInRepository(classeData);
 
  return result[0];
}

export async function getAllClasses(): Promise<Classe[]> {
  const classes = await getAllClassesFromRepository();
  return classes;
}

export async function getClasseById(id: string): Promise<Classe | null> {
  const classes = await getClassesByIdFromRepository(id);
  return classes;
}